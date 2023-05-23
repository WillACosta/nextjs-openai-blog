import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

import clientPromise from '../../../lib/mongodb'

interface Data {}

export default async function buyToken(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const session = await getSession(req, res)
    const userId = session?.user['sub']

    // TODO: move logic to another place
    const mongoDBClient = await clientPromise
    const db = mongoDBClient.db('BlogStandard')

    const userProfile = await db.collection('users').updateOne(
      {
        auth0Id: userId
      },
      {
        $inc: {
          availableTokens: 10
        },
        $setOnInsert: {
          auth0Id: userId
        }
      },
      {
        upsert: true
      }
    )

    res.status(200).json({})
  } catch (error) {
    console.log('error ->', error)
  }
}
