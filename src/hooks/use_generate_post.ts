import { ObjectId } from 'mongodb'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'

export function useGeneratePost() {
  const router = useRouter()
  const [keywords, setKeywords] = useState('tree, talking trees, science')
  const [topic, setTopic] = useState('Generate a blog post about talking trees')
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGeneratePost(event: SyntheticEvent) {
    event.preventDefault()
    setIsGenerating(true)

    const response = await fetch('/api/generate_post', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ topic, keywords })
    })

    const json = await response.json() as {postId: ObjectId}

    // navigate to post detail
    if (json?.postId) {
      setIsGenerating(false)
      router.push(`/post/${json.postId}`)
    }
  }

  return {
    keywords,
    topic,
    setKeywords,
    setTopic,
    handleGeneratePost,
    isGenerating,
    setIsGenerating
  }
}
