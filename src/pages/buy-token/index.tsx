import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ReactElement } from 'react'

import { AppLayout } from '@/components'
import { AppProps } from '@/core/models'
import { getAppProps } from '@/core/utils'

import { BuyTokenResponse } from '../api/buy_token'

const TokenPage = () => {
  async function handleBuyTokens() {
    //TODO: create a custom hook to handle these requests
    const response = await fetch('/api/buy_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })

    const json = await response.json() as BuyTokenResponse
    window.location.href = json.data?.session.url || ''
  }

  return (
    <div>
      <h1>TokenPage works!</h1>
      <button className='btn' onClick={handleBuyTokens}>
        Buy tokens
      </button>
    </div>
  )
}

TokenPage.getLayout = function (page: ReactElement, props: AppProps) {
  return <AppLayout {...props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const props = await getAppProps(context)
    return { props }
  }
})

export default TokenPage
