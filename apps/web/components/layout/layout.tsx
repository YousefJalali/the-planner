import { FC } from 'react'
import { FaTasks } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'
import Link from 'next/link'
import { Montserrat } from '@next/font/google'
import { Logo, Modal, Prompt, Notification } from '@the-planner/ui-web'
import { useWindowSize } from '@the-planner/hooks'

const font = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

type Props = {
  children: JSX.Element | JSX.Element[]
}
export const Layout: FC<Props> = ({ children }) => {
  const { height } = useWindowSize()
  return (
    <div className={`${font.variable} font-sans bg-primary`}>
      <div className="drawer drawer-mobile h-full md:h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center lg:p-2 w-full">
          <main className="w-full mx-auto bg-base-100 lg:bg-base-300 lg:overflow-y-hidden lg:rounded-2xl min-h-screen lg:min-h-fit">
            {children}
            <Modal />
            <Notification />
            <Prompt />
          </main>

          <div id="modal" />
          <div id="prompt" />
          <div id="notification" />
          {/* <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> */}
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="p-4 w-52 bg-transparent text-primary-content">
            <div className="[&>svg]:w-1/3 [&>svg]:mx-auto [&>svg>path]:fill-primary-content mb-16">
              <Logo />
            </div>
            <ul className="menu">
              <li>
                <Link href="/">
                  <FaTasks />
                  Tasks
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <BiCategoryAlt /> Projects
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
