import type { NextApiRequest, NextApiResponse } from 'next'

import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi
} from 'openai'

type Data = {
  title: string
  content: string
  meta: string
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

export default async function generatePost(req: NextApiRequest, res: NextApiResponse<Data>) {
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

  res.status(200).json({
    title,
    content: postContent || '',
    meta
  })
}
