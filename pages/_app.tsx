import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { SessionProvider } from 'next-auth/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { SWRConfig } from 'swr'

import GlobalStyle from '../styles/globals'
import getTheme from '../common/utils/getTheme'

import type { AppProps } from 'next/app'

//loading progress bar
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const modes = ['light', 'dark']

//mocks
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState(modes[0])
  const theme = getTheme(mode)

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
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
      </ThemeProvider>
    </>
  )
}

export default MyApp
