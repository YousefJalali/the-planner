import {
  ThemeProvider,
  Preflight,
  ColorModeProvider,
} from '@xstyled/styled-components'
// import { SessionProvider } from 'next-auth/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'react-circular-progressbar/dist/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-quill/dist/quill.bubble.css'
import { SWRConfig } from 'swr'
import { CookiesProvider } from 'react-cookie'
import '../styles.css'

import { theme, GlobalStyle, Layout } from '@the-planner/ui-web'
import '../fonts.css'

import type { AppProps, NextWebVitalsMetric } from 'next/app'

import {
  PromptCtxProvider,
  ModalCtxProvider,
  NotificationCtxProvider,
} from '@the-planner/hooks'

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
          <GlobalStyle />
          {/* <SessionProvider
            session={pageProps.session}
            refetchInterval={2 * 60 * 60}
          > */}
          <CookiesProvider>
            <SWRConfig
              value={
                {
                  // refreshInterval: 3000,
                  // fetcher: (resource, init) =>
                  //   fetch(resource, init).then((res) => res.json()),
                }
              }
            >
              <NotificationCtxProvider>
                <PromptCtxProvider>
                  <ModalCtxProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ModalCtxProvider>
                </PromptCtxProvider>
              </NotificationCtxProvider>
            </SWRConfig>
          </CookiesProvider>
          {/* </SessionProvider> */}
        </ColorModeProvider>
      </ThemeProvider>
    </>
  )
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export default MyApp
