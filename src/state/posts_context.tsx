import { Post } from '@/core/models'
import React, { PropsWithChildren, useCallback, useState } from 'react'

type PostProviderProps = {
  posts: Post[]
  setPostFromSSR: (posts: Post[]) => void
} & PropsWithChildren

const PostsContext = React.createContext<PostProviderProps>({} as PostProviderProps)
export default PostsContext

export const PostsProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState([] as Post[])

  const setPostFromSSR = useCallback((postsFromSSR = [] as Post[]) => {
    setPosts(postsFromSSR)
  }, [])

  return <PostsContext.Provider value={{ posts, setPostFromSSR }}>{children}</PostsContext.Provider>
}
