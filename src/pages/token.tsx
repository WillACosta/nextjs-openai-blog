import { NextPageWithLayout } from '@/core/types'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ReactElement } from 'react'

import AppLayout from '@/components/AppLayout'

const TokenPage: NextPageWithLayout = () => {
  async function handleBuyTokens() {
    //TODO: create a custom hook to handle these requests
    const response = await fetch('/api/buy_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  return (
    <div>
      <h1>TokenPage works!</h1>
      <button className="btn" onClick={handleBuyTokens}>
        Buy tokens
      </button>
    </div>
  )
}

TokenPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({})

export default TokenPage
