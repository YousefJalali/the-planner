import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import Notification from './Notification'
import Prompt from './Prompt'

type Props = {
  children: JSX.Element | JSX.Element[]
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <x.div
      container
      mx='auto'
      backgroundColor='layout-level0'
      minHeight='100vh'
    >
      {children}
      <Notification />
      <Prompt />
    </x.div>
  )
}

export default Layout
