'use client'

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ObjectId } from 'mongodb'
import { ReactElement } from 'react'

import AppLayout from '@/components/layout/AppLayout'
import { AppProps, Post } from '@/core/models'
import { getAppProps } from '@/core/utils'
import clientPromise from '../../../lib/mongodb'

const PostDetail = ({ postContent }: Post) => {

  return (
    <div className='px-8 py-3 overflow-auto h-full'>
      <div className='max-w-screen-md mx-auto'>
        <div className='[&>p:first-child]:text-muted mt-10' dangerouslySetInnerHTML={{ __html: postContent }} />
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
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
