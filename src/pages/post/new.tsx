import { ReactElement } from 'react'

import AppLayout from '@/components/layout/AppLayout'
import { useGeneratePost } from '@/core/hooks'
import { AppProps } from '@/core/models'

const NewPostPage = () => {
  const { handleGeneratePost, keywords, topic, setKeywords, setTopic, isGenerating } =
    useGeneratePost()

  return (
    <div className='p-5'>
      {isGenerating && (
        <>
          <div className='mx-auto flex h-full animate-pulse text-green-500 flex-col justify-center items-center'>
            generating...
          </div>
        </>
      )}

      {!isGenerating && (
        <form onSubmit={handleGeneratePost}>
          <div>
            <label>Topic</label>
            <input
              className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-lg'
              type='text'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div>
            <label>Keywords (separated by comma)</label>
            <input
              className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-lg'
              type='text'
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <button className='btn' type='submit'>
            Generate
          </button>
        </form>
      )}
    </div>
  )
}

NewPostPage.getLayout = function getLayout(page: ReactElement, pageProps: AppProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export default NewPostPage
