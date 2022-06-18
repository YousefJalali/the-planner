import { x } from '@xstyled/styled-components'
import { FC } from 'react'
// import { isMobile } from 'react-device-detect'
// import { Grid } from '@the-planner/ui-web'
import Modal from './Modal'
import Notification from './Notification'
import Prompt from './Prompt'

type Props = {
  children: JSX.Element | JSX.Element[]
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <x.main
      container
      mx="auto"
      backgroundColor="layout-level0"
      minHeight="100vh"
    >
      {children}
      <Modal />
      <Notification />
      <Prompt />
    </x.main>
  )
}

export default Layout
