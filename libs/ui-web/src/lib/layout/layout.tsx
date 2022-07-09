import { x } from '@xstyled/styled-components'
import { FC } from 'react'
// import { isMobile } from 'react-device-detect'
// import { Grid } from '@the-planner/ui-web'
import Modal from '../modal/modal'
import Notification from '../notification/notification'
import Prompt from '../prompt/prompt'

type Props = {
  children: JSX.Element | JSX.Element[]
}
export const Layout: FC<Props> = ({ children }) => {
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
