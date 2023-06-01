import { Post } from '@/core'

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
        return (
          <div
            key={_id}
            className={`h-[100px] w-full bg-purple-${getRandomColorGrade()} mb-5 break-inside rounded-3xl flex justify-center items-center p-5 text-lg`}
          >
            {topic}
          </div>
        )
      })}
    </div>
  )
}
