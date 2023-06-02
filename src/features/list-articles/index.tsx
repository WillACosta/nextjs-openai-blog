import { useCallback } from 'react'

import { Post } from '@/core'
import ArticleItem from './components/ArticleItem'

type ListArticlesProps = {
  posts: Post[]
}

function getRandomColorGrade() {
  const colorGrade = [50, 100, 200, 300]
  const randomIndex = Math.floor(Math.random() * colorGrade.length)
  return colorGrade[randomIndex]
}

export default function ListArticles({ posts }: ListArticlesProps) {
  const handlePostLabel = useCallback((title: string) => {
    return title.split('|')[0].trim() || title
  }, [])

  return (
    <div className='masonry sm:masonry-sm md:masonry-md lg:masonry-lg xl:masonry-xl'>
      {posts.map(({ _id, title }) => {
        return (
          <ArticleItem
            key={_id}
            id={_id}
            colorGrade={getRandomColorGrade()}
            label={handlePostLabel(title)}
          />
        )
      })}
    </div>
  )
}
