import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { AppProps } from '@/core/models'
import { getAppProps } from '@/core/utils'
import { ReactElement, useEffect } from 'react'

import { ToastProps, handleShowToastNotification } from '@/core/ui'
import { Search } from 'react-feather'

import IconButton from '@/components/atoms/IconButton'
import InputField from '@/components/atoms/InputField'
import ToastComponent from '@/components/atoms/ToastComponent'
import AppLayout from '@/components/layout/AppLayout'
import useSearchPost from '@/core/hooks/use_search_post'
import ListArticles from '@/features/list-articles'
import PurchaseCreditsView from '@/features/purchase-credits'

type HomeProps = {
  hasPaymentWithSuccess: boolean
} & AppProps

const Home = ({ posts: postFromSSR, availableTokens, hasPaymentWithSuccess }: HomeProps) => {
  const { handleSearchArticle, filteredPosts, setQueryText } = useSearchPost(postFromSSR)

  useEffect(
    function handleSuccess() {
      if (hasPaymentWithSuccess) {
        handleShowToastNotification({
          message: 'your payment was finished with successful!',
          type: 'success'
        } as ToastProps)
      }
    },
    [hasPaymentWithSuccess]
  )

  return (
    <>
      <div className='container mx-auto grid grid-rows-[200px_1fr] h-screen w-screen px-8 pb-4'>
        <div className='flex flex-col items-center my-8'>
          <strong className='text-center text-lg'>make something great</strong>

          <div className='w-full'>
            <form className='flex gap-3 mt-5'>
              <InputField onChange={handleSearchArticle} placeHolder='search your articles here'  />
              <IconButton onClick={(e) => setQueryText(e.currentTarget.value)} icon={<Search />} className='w-[auto]' />
            </form>

            <PurchaseCreditsView availableTokens={availableTokens} />
          </div>
        </div>

        <div className='container mx-auto mt-5'>
          {filteredPosts.length === 0 && (
            <>
              <div className='flex flex-col justify-center items-center text-muted'>
                <p>no items found.</p>
              </div>
            </>
          )}

          {filteredPosts.length > 0 && <ListArticles posts={filteredPosts} />}
        </div>
      </div>

      <ToastComponent />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement, pageProps: HomeProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const hasPaymentWithSuccess = context.query['payment_success']
    const appProps = await getAppProps(context)

    return {
      props: {
        ...appProps,
        hasPaymentWithSuccess: Boolean(hasPaymentWithSuccess)
      }
    }
  }
})

export default Home
