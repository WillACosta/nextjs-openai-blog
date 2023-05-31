import { PropsWithChildren } from 'react'

import { AppProps } from '@/core/models'
import { AppHeader } from './AppHeader'

type AppLayoutProps = PropsWithChildren<AppProps>

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}
