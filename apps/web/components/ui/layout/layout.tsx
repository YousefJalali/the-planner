import { FC } from 'react'
import { Montserrat, Open_Sans } from '@next/font/google'
import { Notification } from '../'
import SideDrawer from './SideDrawer'
import { useWindowSize } from '@the-planner/hooks'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-title',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-text',
})

type Props = {
  children: JSX.Element | JSX.Element[]
}
export const Layout: FC<Props> = ({ children }) => {
  const { height } = useWindowSize()

  return (
    <div
      className={`${montserrat.variable} ${openSans.variable} font-title font-text bg-primary`}
    >
      <div className="drawer drawer-mobile h-full md:h-screen">
        <input id="side-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center lg:p-2 w-full">
          <main
            className="w-full mx-auto bg-base-100 lg:bg-base-200 lg:overflow-y-hidden lg:rounded-2xl min-h-screen lg:min-h-fit"
            style={{ minHeight: height }}
          >
            {children}
            <Notification />
          </main>
        </div>

        <SideDrawer />
      </div>

      <div id="modal" />
      <div id="prompt" />
      <div id="notification" />
    </div>
  )
}

export default Layout
