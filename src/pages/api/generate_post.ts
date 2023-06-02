import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi
} from 'openai'

import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'

type Data = {
  postId: ObjectId
}

const defaultConfigForGPT = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7
}

const defaultMessages = (topic: string, keywords: string): ChatCompletionRequestMessage[] => {
  return [
    {
      role: 'system',
      content: 'You are a blog post generator'
    },
    {
      role: 'user',
      content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
      The response should be formatted in SEO-friendly HTML,
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`
    }
  ]
}

export default withApiAuthRequired(
  async function generatePost(req: NextApiRequest, res: NextApiResponse<Data>) {

    const session = await getSession(req, res)
    const userId = session?.user['sub']

    const mongoDBClient = await clientPromise
    const db = mongoDBClient.db('BlogStandard')
    const userProfile = await db.collection<{ availableTokens: number }>('users').findOne({
      auth0Id: userId
    })

    if (!userProfile?.availableTokens) {
      return res.status(403).end('you not have sufficient credits for handle it')
    }

    const openAIClient = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPEN_AI_KEY
      })
    )

    const { topic, keywords } = req.body

    const generatedPostContent = await openAIClient.createChatCompletion({
      ...defaultConfigForGPT,
      messages: defaultMessages(topic, keywords)
    })

    const postContent = generatedPostContent.data.choices[0].message?.content || ''

    const generatedTitle = await openAIClient.createChatCompletion({
      ...defaultConfigForGPT,
      messages: [
        ...defaultMessages(topic, keywords),
        {
          role: 'assistant',
          content: postContent
        },
        {
          role: 'user',
          content: 'Generate appropriate title tag text for the above blog post'
        }
      ]
    })

    const generatedMeta = await openAIClient.createChatCompletion({
      ...defaultConfigForGPT,
      messages: [
        ...defaultMessages(topic, keywords),
        {
          role: 'assistant',
          content: postContent
        },
        {
          role: 'user',
          content: 'Generate appropriate title tag text for the above blog post'
        },
        {
          role: 'user',
          content: 'Generate SEO-friendly meta description content for the above blog post'
        }
      ]
    })

    const title = generatedTitle.data.choices[0].message?.content || '';
    const meta = generatedMeta.data.choices[0].message?.content || '';

    // TODO: decrement user tokens in DB (move to domain)
    await db.collection('users').updateOne({
      auth0Id: userId
    }, {
      $inc: {
        availableTokens: -1
      }
    })

    // TODO: save generated post on DB
    const post = await db.collection('posts').insertOne({
      postContent: postContent,
      title,
      metaDescription: meta,
      topic,
      keywords,
      userId: userProfile._id,
      created: new Date()
    })

    res.status(200).json({
      postId: post.insertedId
    })
  }
)
