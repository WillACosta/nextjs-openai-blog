import UserProfile from '@/pages/(profile)/page'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { DollarSign } from 'react-feather'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
        <div className="bg-gradient-to-b from-slate-800 to-cyan-800 flex flex-col overflow-hidden text-white p-2">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-center text-lg">BlogPost & AI</div>
            <Link
              className="bg-green-400 tracking-wider w-full text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-900 transition-colors text-center mt-10"
              href="/post/new"
            >
              New post
            </Link>

            <Link className="flex items-center gap-3" href="/token">
              <DollarSign size="20" />
              <span>0 tokens</span>
            </Link>
          </div>

          <div className="flex-1 overflow-auto mt-10">list posts</div>

          <UserProfile />
        </div>

        {children}
      </div>
    </>
  )
}
