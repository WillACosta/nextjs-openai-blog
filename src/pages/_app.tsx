import { AppPageWithLayout } from '@/core/types'
import '@/styles/globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { PostsProvider } from '@/pages/post/state/posts_context'
import '../styles/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: AppPageWithLayout
}

const interFontSettings = Inter({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--inter-font-family'
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <UserProvider>
      <PostsProvider {...pageProps}>
        <main className={`${interFontSettings.variable} font-body`}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </PostsProvider>
    </UserProvider>
  )
}
