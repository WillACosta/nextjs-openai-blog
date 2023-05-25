import { Post } from '@/core/models'
import { LoadMorePostsResponse } from '@/pages/api/load_posts'
import React, { PropsWithChildren, useCallback, useReducer, useState } from 'react'

type PostProviderProps = {
  posts: Post[]
  noMorePosts: boolean
  setPostFromSSR: (posts: Post[]) => void
  loadMorePosts: (payload: LoadMorePostsType) => void
} & PropsWithChildren

type LoadMorePostsType = {
  lastPostDate: Date
}

interface PostAction {
  type: 'ADD' | 'DELETE'
  data: Post[]
}

const PostsContext = React.createContext<PostProviderProps>({} as PostProviderProps)
export default PostsContext

function postsReducer (state: Post[], action: PostAction) {
  switch(action.type) {
    case 'ADD': {
      const newPosts = [...state]

      action.data.forEach(item => {
        const exists = newPosts.find((p) => p._id === item._id)
        if (!exists) {
          newPosts.push(item)
        }
      })

      return newPosts
    }

    default:
      return state
  }
}

export const PostsProvider = ({ children }: PostProviderProps) => {
  const [posts, dispatch] = useReducer(postsReducer, [])
  const [noMorePosts, setNoMorePosts] = useState(false)

  const setPostFromSSR = useCallback((postsFromSSR = [] as Post[]) => {
    dispatch({
      type: 'ADD',
      data: postsFromSSR
    })
  }, [])

  const loadMorePosts = useCallback(async ({ lastPostDate }: LoadMorePostsType) => {
    const response = await fetch(`api/load_posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        lastPostDate
      })
    })

    const json = await response.json() as LoadMorePostsResponse
    const result = json.data || []

    if (result?.length < 5) setNoMorePosts(true)

    dispatch({
      type: 'ADD',
      data: result
    })

  }, [])

  return <PostsContext.Provider value={{ noMorePosts, posts, setPostFromSSR, loadMorePosts }}>{children}</PostsContext.Provider>
}
