import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import { AppLayout } from '@/components'
import { AppProps } from '@/core/models'
import { getAppProps } from '@/core/utils'
import { ReactElement } from 'react'

import IconButton from '@/components/IconButton'

import { Search } from 'react-feather'

function getRandomColorGrade() {
  const colorGrade = [50, 100, 200, 300, 400, 500, 600]
  const randomIndex = Math.floor(Math.random() * colorGrade.length)

  return colorGrade[randomIndex]
}

const Home = ({ posts: postFromSSR, availableTokens }: AppProps) => {
  return (
    <>
      <div className='grid grid-rows-[300px_1fr] h-screen w-screen p-12'>
        <div className='flex flex-col items-center justify-end mb-10'>
          <strong className='text-center text-lg'>make something great</strong>

          <div>
            <form className='flex gap-3 mt-5'>
              <input
                type='text'
                className='w-[700px] rounded-lg p-4 bg-zinc-100 flex-grow-[2]'
                placeholder='search your articles here'
              />

              <IconButton icon={<Search />} className='w-[auto]' />
            </form>

            <div className='flex gap-3 mt-1 text-muted'>
              <p>you have: {availableTokens} credits</p>
              <button className='underline'>buy more</button>
            </div>
          </div>
        </div>

        <div className='container mx-auto mt-10'>
          <div className='masonry sm:masonry-sm md:masonry-md lg:masonry-lg xl:masonry-xl'>
            {postFromSSR.map(({ _id, topic }) => {
              return (
                <div
                  key={_id}
                  className={`h-[100px] w-full bg-purple-${getRandomColorGrade()} mb-5 break-inside rounded-3xl flex justify-center items-center p-5 text-lg`}
                >
                  {topic}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement, pageProps: AppProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const props = await getAppProps(context)
    return { props }
  }
})

export default Home
