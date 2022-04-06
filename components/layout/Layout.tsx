import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import Notification from './Notification'

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
    </x.div>
  )
}

export default Layout
