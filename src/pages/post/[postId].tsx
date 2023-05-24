'use client'

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ObjectId } from 'mongodb'
import { ReactElement } from 'react'

import { AppLayout } from '@/components'
import { AppProps, Post } from '@/core/models'
import { NextPageWithLayout } from '@/core/types'
import { getAppProps } from '@/core/utils'
import clientPromise from '../../../lib/mongodb'

type PostDetailProps = Post & NextPageWithLayout

const PostDetail = ({title, postContent}: PostDetailProps) => {

  return (
    <div className='p-4 overflow-auto h-full'>
      <div className='max-w-screen-sm mx-auto'>
        <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
          Blog Post
        </div>

        <div dangerouslySetInnerHTML={{ __html: postContent }} />
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  // access logged user and get ID

  async getServerSideProps(context) {
    const appProps = await getAppProps(context)

    const session = await getSession(context.req, context.res)
    const client = await clientPromise
    const db = client.db('BlogStandard')

    const user = await db.collection('users').findOne({
      auth0Id: session?.user.sub
    })

    const postId = context.params!.postId as string

    const post = await db.collection('posts').findOne({
      _id: new ObjectId(postId),
      userId: user?._id
    })

    if (!post) {
      return {
        redirect: {
          destination: '/post/new',
          permanent: false
        }
      }
    }

    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        ...appProps
      } as Post
    }
  }
})

PostDetail.getLayout = function (page: ReactElement, props: AppProps) {
  return <AppLayout {...props}>{page}</AppLayout>
}

export default PostDetail
