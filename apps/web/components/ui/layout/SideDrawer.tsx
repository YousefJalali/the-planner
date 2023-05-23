import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useUser } from 'apps/web/common/AuthCtx'
import Logo from '../logo/logo'
import ProfileButton from '../../profile/ProfileButton'
import { formatToUrlDate } from '@the-planner/utils'
import { FaTasks } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'

export default function SideDrawer() {
  // const [theme, setTheme] = useState<string | null>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const router = useRouter()
  const { user } = useUser()

  // useEffect(() => {
  //   setTheme(localStorage.getItem('theme'))
  // }, [])

  const clickHandler = () => {
    if (labelRef.current) {
      labelRef.current.click()
    }
  }

  return (
    <div className="drawer-side">
      <label
        ref={labelRef}
        htmlFor="side-drawer"
        className="drawer-overlay"
      ></label>

      <ul className="menu w-64 space-y-2 p-6 bg-primary text-primary-content [&>li>a.active]:bg-base-100 [&>li>a.active]:text-primary">
        <li className="mb-6">
          <Link
            href="/"
            onClick={clickHandler}
            className="[&>svg]:w-1/3 [&>svg]:mx-auto [&>svg>path]:fill-primary-content mb-6 hover:bg-transparent"
          >
            <Logo />
          </Link>
        </li>

        <li>
          <Link
            href={`/?d=${formatToUrlDate(new Date())}`}
            onClick={clickHandler}
            className={
              ['/projects', '/auth', '/profile'].every(
                (el) => !router.pathname.includes(el)
              )
                ? 'active'
                : ''
            }
          >
            <FaTasks />
            Tasks
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            onClick={clickHandler}
            className={router.pathname.includes('/projects') ? 'active' : ''}
          >
            <BiCategoryAlt /> Projects
          </Link>
        </li>

        <ul className="menu flex flex-1 justify-end space-y-2 [&>li>a.active]:bg-base-100 [&>li>a.active]:text-primary">
          <li className="bg-transparent">
            <ProfileButton onClick={clickHandler} />
          </li>

          {!user && (
            <>
              <li>
                <Link
                  href="/auth/signup"
                  onClick={clickHandler}
                  className={router.pathname === '/auth/signup' ? 'active' : ''}
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  onClick={clickHandler}
                  className={
                    router.pathname === '/auth/login' ||
                    router.pathname === '/auth/forgot-password'
                      ? 'active'
                      : ''
                  }
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* <li className="form-control w-full border-t pt-2 ">
          <label className="label cursor-pointer">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={theme?.trim() === 'dark'}
              onChange={() =>
                setTheme((prevState) =>
                  prevState === 'winter' ? 'dark' : 'winter'
                )
              }
              className="checked toggle-primary toggle"
              data-toggle-theme="winter, dark"
            />
          </label>
        </li> */}
      </ul>
    </div>
  )
}
