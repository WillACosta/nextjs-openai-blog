import { PropsWithChildren } from 'react'

import { AppProps } from '@/core/models'
import AppHeader from './AppHeader'

type AppLayoutProps = PropsWithChildren<AppProps>

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
     <AppHeader />
      {children}
    </>
  )
}
