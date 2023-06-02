import { ObjectId } from 'mongodb'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { ToastProps, handleShowToastNotification } from '../ui'

export function useGeneratePost() {
  const router = useRouter()

  const [keywords, setKeywords] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGeneratePost(event: SyntheticEvent) {
    event.preventDefault()
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate_post', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ topic, keywords })
      })

      const json = await response.json() as {postId: ObjectId}

      if (json?.postId) {
        setIsGenerating(false)
        router.push(`/post/${json.postId}`)
      }
    } catch (error) {
      setIsGenerating(false)
      handleShowToastNotification({
        type: 'error',
        message: 'you not have sufficient credits for generating a blog post'
      } as ToastProps)
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
