import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSidePropsContext } from 'next'

import clientPromise from '../../../lib/mongodb'
import { AppProps, UserDB } from '../models'

export async function getAppProps(context: GetServerSidePropsContext) {
  const userSession = await getSession(context.req, context.res)
  const client = await clientPromise
  const db = client.db('BlogStandard')

  const user = await db.collection('users').findOne<UserDB>({
    auth0Id: userSession?.user.sub
  })

  if (!user) {
    return {
      availableTokens: 0,
      posts: []
    }
  }

  const posts = await db
    .collection('posts')
    .find({
      userId: user._id
    })
    .limit(5)
    .sort({
      created: -1
    })
    .toArray()

  return {
    availableTokens: user.availableTokens,
    posts: posts.map(({ created, _id, userId, ...props }) => ({
      _id: _id.toString(),
      created: created.toString(),
      ...props
    })),
    postId: context.params?.postId || null
  } as AppProps
}
