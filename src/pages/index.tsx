import Button from '@/components/Button'

export default function Home() {
  return (
    <>
      <div className='flex bg-white max-md:flex-col-reverse'>
        <div className='h-screen flex flex-col justify-center items-center px-20 max-md:h-auto max-md:mt-16'>
          <h1>Create something great!</h1>
          <p className='mt-8 max-w-md font-normal text-md text-muted'>
            Welcome to your AI-powered SaaS solution to generate SEO-optimized blog posts in
            minutes. Get high-quality content, without sacrificing your precious time.
          </p>

          <Button label='Get Started' url='/post/new' />
        </div>

        <div className='h-screen flex-grow-[2] bg-main-gradient max-md:h-[400px]'></div>
      </div>
    </>
  )
}
