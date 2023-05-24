import { NextRequest } from 'next/server';
import Stripe from 'stripe';

export interface VerifyStripeProps {
  req: NextRequest;
  stripe: Stripe;
  endpointSecret: string;
}

export const verifyStripe = async ({ req, stripe, endpointSecret }: VerifyStripeProps) => {
  const buf = await buffer(req)
  const sig = req.headers.get('stripe-signature') || ''

  const event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret)

  return event
}

module.exports = verifyStripe

async function buffer(readable: any) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks)
}
