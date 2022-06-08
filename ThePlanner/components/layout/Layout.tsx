import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import Grid from '../../styles/Grid'
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
      mx='auto'
      backgroundColor='layout-level0'
      minHeight='100vh'
    >
      {isMobile ? (
        <>
          {/* <Grid /> */}
          {children}
          <Modal />
          <Notification />
          <Prompt />
        </>
      ) : (
        <x.div
          container='none'
          h='100vh'
          w='100vw'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <h1>Desktop version is still under development</h1>
        </x.div>
      )}
    </x.main>
  )
}

export default Layout
