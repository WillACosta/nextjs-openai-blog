import { NextPageWithLayout } from '@/core/types'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ReactElement, SyntheticEvent, useState } from 'react'

import AppLayout from '@/components/AppLayout'

const NewPostPage: NextPageWithLayout = () => {
  const [postContent, setPostContent] = useState('')
  const [keywords, setKeywords] = useState('tree, talking trees, science')
  const [topic, setTopic] = useState('Generate a blog post about talking trees')

  async function handleGeneratePost(event: SyntheticEvent) {
    event.preventDefault()

    const response = await fetch('/api/generate_post', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ topic, keywords })
    })

    const json = await response.json()
    setPostContent(json.content)
  }

  return (
    <>
      <div>
        <form onSubmit={handleGeneratePost}>
          <div>
            <label>Generate a blog post on the topic of:</label>
            <input
              className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div>
            <label>Generate a blog post on the keywords of:</label>
            <input
              className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Generate
          </button>
        </form>

        <div className="max-w-screen-sm p-10" dangerouslySetInnerHTML={{ __html: postContent }} />
      </div>
    </>
  )
}

NewPostPage.getLayout = function (page: ReactElement) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({})

export default NewPostPage
