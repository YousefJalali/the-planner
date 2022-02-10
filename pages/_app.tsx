import {
  ThemeProvider,
  Preflight,
  ColorModeProvider,
} from '@xstyled/styled-components'
import { SessionProvider } from 'next-auth/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { SWRConfig } from 'swr'

import theme from '../styles/theme'

import type { AppProps } from 'next/app'

//loading progress bar
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

//mocks
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <Preflight />
          <SessionProvider
            session={pageProps.session}
            refetchInterval={2 * 60 * 60}
          >
            <SWRConfig
              value={{
                // refreshInterval: 3000,
                fetcher: (resource, init) =>
                  fetch(resource, init).then((res) => res.json()),
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </SessionProvider>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
