import { FC } from 'react'
import Modal from '../modal/modal'
import Notification from '../notification/notification'
import Prompt from '../prompt/prompt'

import { Montserrat } from '@next/font/google'

const font = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

type Props = {
  children: JSX.Element | JSX.Element[]
}
export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={`${font.variable} font-sans`}>
      <main className="mx-auto bg-base-100 min-h-screen container">
        {children}
        <Modal />
        <Notification />
        <Prompt />
      </main>

      <div id="modal" />
      <div id="prompt" />
      <div id="notification" />
    </div>
  )
}

export default Layout
