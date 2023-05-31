import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const stripeAPI = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export interface BuyTokenResponse {
  data?: {
    session: Stripe.Response<Stripe.Checkout.Session>;
  },
  statusCode?: number
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BuyTokenResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const session = await getSession(req, res)
    const userId = session?.user['sub']

    const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://'
    const host = req.headers.host

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card', 'boleto'],
      line_items: [
        {
          price: process.env.STRIPE_PRODUCT_PRICE_ID,
          quantity: 1
        }
      ],
      success_url: `${protocol}${host}/success`,
      cancel_url: `${req.headers.origin}/donate-with-checkout`,
      payment_intent_data: {
        metadata: {
          userId: userId
        }
      },
      metadata: {
        userId: userId
      }
    } as Stripe.Checkout.SessionCreateParams

    const checkoutSession = await stripeAPI.checkout.sessions.create(params)
    res.status(200).json({ data: { session: checkoutSession } })

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
