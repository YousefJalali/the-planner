import type { AppProps } from 'next/app'
import { ThemeProvider, ColorModeProvider } from '@xstyled/styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import { SWRConfig } from 'swr'
import { CookiesProvider } from 'react-cookie'
import '../styles.css'
import 'nprogress/nprogress.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { theme, GlobalStyle, Layout } from '@the-planner/ui-web'

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
