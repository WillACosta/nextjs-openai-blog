import { NextPageWithLayout } from '@/core/types'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ReactElement } from 'react'

import AppLayout from '@/components/app_layout/app_layout'

const NewPostPage: NextPageWithLayout = () => {
  return <h1>test</h1>
}

NewPostPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({})

export default NewPostPage;