import Button from '@/components/Button'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-default-gradient">
      <UserProvider>
        <div className="p-5 rounded-lg bg-white max-w-[400px] flex flex-col gap-2">
          <p>
            Welcome to your AI-powered SaaS solution to generate SEO-optimized blog posts in
            minutes. Get high-quality content, without sacrificing your precious time.
          </p>

          <Button url="/post/new" label="Get Started" />
        </div>
      </UserProvider>
    </div>
  )
}
