import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { SWRConfig } from 'swr'
import { CookiesProvider } from 'react-cookie'
import '../styles.css'
import 'nprogress/nprogress.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { PromptCtxProvider, NotificationCtxProvider } from '@the-planner/hooks'
import Layout from '../components/ui/layout/layout'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthContextProvider } from '../common/AuthCtx'

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
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
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
          <AuthContextProvider>
            <NotificationCtxProvider>
              <PromptCtxProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PromptCtxProvider>
            </NotificationCtxProvider>
          </AuthContextProvider>
        </SWRConfig>
      </CookiesProvider>
    </ErrorBoundary>
  )
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }

export default MyApp
