import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NotificationCtxProvider } from '@the-planner/hooks'
import '@testing-library/jest-dom'

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
  return <NotificationCtxProvider>{children}</NotificationCtxProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
