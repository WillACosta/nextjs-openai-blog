import { ReactElement } from 'react'

import InputField from '@/components/atoms/InputField'
import AppLayout from '@/components/layout/AppLayout'
import { useGeneratePost } from '@/core/hooks'
import { AppProps } from '@/core/models'

const NewPostPage = () => {
  const { handleGeneratePost, keywords, topic, setKeywords, setTopic, isGenerating } =
    useGeneratePost()

  return (
    <div className='container mx-auto flex flex-col gap-12 items-center mt-10'>
      {isGenerating && <div className='animate-pulse text-purple-400'>generating...</div>}

      {!isGenerating && (
        <>
          <p className='text-lg text-md max-w-xs md:max-w-none'>
            generate your blog post here, with power of generating AI.
          </p>

          <form onSubmit={handleGeneratePost} className='flex flex-col gap-8 w-[70%]'>
            <div className='flex flex-col gap-4'>
              <label>topic</label>
              <InputField
                value={topic}
                onChange={(e) => setTopic(e.currentTarget.value)}
                placeHolder='what is about your text?'
              />
            </div>

            <div className='flex flex-col gap-4'>
              <label>keywords (separated by comma)</label>
              <InputField
                value={keywords}
                onChange={(e) => setKeywords(e.currentTarget.value)}
                placeHolder='can you tell me some keywords for this text?'
              />
            </div>

            <button
              disabled={topic.length == 0 || keywords.length == 0}
              className='btn'
              type='submit'
            >
              Generate
            </button>
          </form>
        </>
      )}
    </div>
  )
}

NewPostPage.getLayout = function getLayout(page: ReactElement, pageProps: AppProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export default NewPostPage
