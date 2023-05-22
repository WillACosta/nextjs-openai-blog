declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      AUTH0_SECRET: string
      AUTH0_BASE_URL: string
      AUTH0_ISSUER_BASE_URL: string
      AUTH0_CLIENT_ID: string
      AUTH0_CLIENT_SECRETVgi8CIL: string
      OPEN_AI_KEY: string
    }
  }
}

export { }

