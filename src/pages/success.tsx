import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ReactElement } from 'react'

import { AppLayout } from '@/components'
import { getAppProps } from '@/core/utils'
import { AppProps } from '../core/models'

const TankYouPage = () => {
  return (
    <div>
      <h2>Thank you for your purchasing</h2>
    </div>
  )
}

TankYouPage.getLayout = function (page: ReactElement, props: AppProps) {
  return <AppLayout {...props}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const props = await getAppProps(context)
    return { props }
  }
})

export default TankYouPage
