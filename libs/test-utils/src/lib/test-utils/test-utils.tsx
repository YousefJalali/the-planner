import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
// import { ThemeProvider } from 'styled-components'
// import { ColorModeProvider } from '@xstyled/styled-components'
// import { NotificationCtxProvider } from './common/contexts/NotificationCtx'

// Mocks useRouter
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: {
  route: string
  pathname: string
  query: string
  asPath: string
}) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }))
}

const AllTheProviders = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return <div>{children}</div>
  // (
  // <ThemeProvider theme={theme}>
  //   <ColorModeProvider>
  //     <NotificationCtxProvider>{children}</NotificationCtxProvider>

  //   </ColorModeProvider>
  // </ThemeProvider>
  // )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
