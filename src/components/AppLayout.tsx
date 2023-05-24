import UserProfile from '@/components/UserProfile'
import Link from 'next/link'
import { PropsWithChildren, useContext, useEffect } from 'react'
import { DollarSign } from 'react-feather'

import { AppProps } from '@/core/models'
import PostsContext from '@/state/posts_context'
import Button from './Button'

type AppLayoutProps = PropsWithChildren<AppProps>

export const AppLayout = ({
  children,
  availableTokens,
  posts: postFromSSR,
  postId
}: AppLayoutProps) => {
  const { posts, setPostFromSSR } = useContext(PostsContext)

  useEffect(() => {
    // save received posts on context state
    setPostFromSSR(postFromSSR)
  }, [postFromSSR, setPostFromSSR])

  function getAvailableTokensLabel() {
    if (availableTokens <= 1) return `${availableTokens?.toString()} token`
    return `${availableTokens?.toString()} tokens`
  }

  return (
    <div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
      <div className='bg-gradient-to-b from-slate-800 to-cyan-800 flex flex-col overflow-hidden text-white p-2'>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-center text-lg'>BlogPost & AI</div>

          <Button url='/post/new' label=' New post' />

          <Link className='flex items-center gap-3' href='/token'>
            <DollarSign size='20' />
            <span>{getAvailableTokensLabel()}</span>
          </Link>
        </div>

        <div className='flex-1 overflow-auto mt-10'>
          {posts?.map(({ _id, topic }) => (
            <Link
              className={`border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded ${
                postId === _id ? '' : 'bg-white/20 border-white'
              }`}
              key={_id}
              href={`/post/${_id}`}
            >
              {topic}
            </Link>
          ))}

          <span className='hover:underline text-sm text-slate-400 text-center mt-5 cursor-pointer'>
            load more posts
          </span>
        </div>

        <UserProfile />
      </div>

      {children}
    </div>
  )
}
