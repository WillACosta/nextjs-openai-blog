import { NextPageWithLayout } from '@/core/types'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ReactElement } from 'react'

import AppLayout from '@/components/AppLayout'

const TokenPage: NextPageWithLayout = () => {
  return <h1>TokenPage works!</h1>
}

TokenPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({})

export default TokenPage;