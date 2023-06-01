import { FormEvent, useState } from 'react'
import { Post } from '../models'

export default function useSearchPost(initialValue: Post[]) {
  const [queryText, setQueryText] = useState('')
  let [filteredPosts, setFilteredPosts] = useState(initialValue)

  function handleSearchArticle(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value

    event.preventDefault()
    setQueryText(value)
    setFilteredPosts(initialValue.filter((el) => el.topic.includes(value)))
  }

  return {
    queryText,
    setQueryText,
    filteredPosts,
    setFilteredPosts,
    handleSearchArticle
  }
}
