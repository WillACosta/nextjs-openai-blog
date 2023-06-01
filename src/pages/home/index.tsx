import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { AppProps } from '@/core/models'
import { getAppProps } from '@/core/utils'
import { ReactElement, useEffect } from 'react'

import IconButton from '@/components/atoms/IconButton'
import AppLayout from '@/components/layout/AppLayout'

import useSearchPost from '@/core/hooks/use_search_post'
import ListArticles from '@/features/list-articles'
import PurchaseCreditsView from '@/features/purchase-credits/views'
import { Search } from 'react-feather'

type HomeProps = {
  hasPaymentWithSuccess: boolean
} & AppProps

const Home = ({ posts: postFromSSR, availableTokens, hasPaymentWithSuccess }: HomeProps) => {
  const { handleSearchArticle, filteredPosts } = useSearchPost(postFromSSR)

  useEffect(
    function handleSuccess() {
      if (hasPaymentWithSuccess) {
        // handle toast and remove success_url
        alert('Payment made with successful!')
      }
    },
    [hasPaymentWithSuccess]
  )

  return (
    <div className='grid grid-rows-[300px_1fr] h-screen w-screen px-5 md:p-12'>
      <div className='flex flex-col items-center justify-end mb-10'>
        <strong className='text-center text-lg'>make something great</strong>

        <div>
          <form className='flex gap-3 mt-5'>
            <input
              type='text'
              className='w-[300px] md:w-[500px] lg:w-[700px] rounded-lg p-4 bg-zinc-100 flex-grow-[2]'
              placeholder='search your articles here'
              onChange={handleSearchArticle}
            />

            <IconButton icon={<Search />} className='w-[auto]' />
          </form>

          <PurchaseCreditsView availableTokens={availableTokens} />
        </div>
      </div>

      <div className='container mx-auto mt-10'>
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
