import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import { ColorModeProvider } from '@xstyled/styled-components'
import { NotificationCtxProvider } from './common/contexts/NotificationCtx'

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <NotificationCtxProvider>{children}</NotificationCtxProvider>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
