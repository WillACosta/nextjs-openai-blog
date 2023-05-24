import { buffer } from 'micro'
import Cors from 'micro-cors'

import Stripe from 'stripe'

import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../../lib/mongodb'

const cors = Cors({
  allowMethods: ['POST', 'HEAD']
})

export const config = {
  api: {
    bodyParser: false
  }
}

const stripeAPI = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

async function handleStripePayment(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let event: Stripe.Event

  if (request.method === 'POST') {
    const buf = await buffer(request)
    const signature = request.headers['stripe-signature']!

    try {
      event = stripeAPI.webhooks.constructEvent(buf.toString(), signature, endpointSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      if (err! instanceof Error) console.log(err)
      return response.status(400).send(`Webhook Error: ${errorMessage}`)
    }

    // handle success for payment

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await updateUserTokensForSuccessPayment(paymentIntent)
    } else if (event.type === 'payment_intent.payment_failed') {
      // payment failed
    } else if (event.type === 'charge.succeeded') {
    } else {
      // unhandled payment
    }

    response.json({ received: true })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method Not Allowed')
  }
}

async function updateUserTokensForSuccessPayment(paymentIntent: Stripe.PaymentIntent) {
  const mongoDBClient = await clientPromise
  const db = mongoDBClient.db('BlogStandard')
  const auth0Id = paymentIntent.metadata.userId

  await db.collection('users').updateOne(
    {
      auth0Id
    },
    {
      $inc: {
        availableTokens: 10
      },
      $setOnInsert: {
        auth0Id
      }
    },
    {
      upsert: true
    }
  )
}

export default cors(handleStripePayment as any)