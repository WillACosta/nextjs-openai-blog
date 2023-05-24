import { NextPage } from 'next'

import { ReactElement, ReactNode } from 'react'
import { AppProps } from '../models'

export type AppPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, appProps: AppProps) => ReactNode
}
