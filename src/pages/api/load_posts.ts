import { Post, UserDB } from '@/core/models'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

export type LoadMorePostsResponse = {
  data?: Post[],
  error?: string
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoadMorePostsResponse>
) {
  try {
    const session = await getSession(req, res)!
    const auth0Id = session?.user.sub

    const client = await clientPromise
    const db = client.db('BlogStandard')

    const userProfile = await db.collection<UserDB>('users').findOne({
      auth0Id
    })

    const { lastPostDate } = req.body

    const results = await db
    .collection<Post>('posts')
    .find({
      userId: userProfile?._id,
      created: { $lt: new Date(lastPostDate) }
    })
    .limit(5)
    .sort({ created: -1 })
    .toArray()

    return res.status(200).json({data: results})

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Internal Error'})
  }
})
