import { MongoClient } from "mongodb"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      AUTH0_SECRET: string
      AUTH0_BASE_URL: string
      AUTH0_ISSUER_BASE_URL
      AUTH0_ISSUER_BASE_URL: string
      AUTH0_CLIENT_ID: string
      AUTH0_CLIENT_SECRET: string
      OPEN_AI_KEY: string
      NODE_ENV: string
      STRIPE_SECRET_KEY: string
      STRIPE_PRODUCT_PRICE_ID: string
      STRIPE_WEBHOOK_SECRET: string
    }
  }

  var _mongoClientPromise: Promise<MongoClient>

}

export { }
