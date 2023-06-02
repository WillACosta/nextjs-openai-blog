import { Post } from '@/core'
import ArticleItem from './components/ArticleItem'

type ListArticlesProps = {
  posts: Post[]
}

function getRandomColorGrade() {
  const colorGrade = [50, 100, 200, 300, 400, 500]
  const randomIndex = Math.floor(Math.random() * colorGrade.length)
  return colorGrade[randomIndex]
}

export default function ListArticles({ posts }: ListArticlesProps) {
  return (
    <div className='masonry sm:masonry-sm md:masonry-md lg:masonry-lg xl:masonry-xl'>
      {posts.map(({ _id, topic }) => {
        return <ArticleItem key={_id} id={_id} colorGrade={getRandomColorGrade()} label={topic} />
      })}
    </div>
  )
}
