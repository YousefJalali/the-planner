import { useState } from 'react'
import { HiLockClosed } from 'react-icons/hi'
import Login from './Login'
import SignUp from './SignUp'
import { useUser } from 'apps/web/common/AuthCtx'

export default function ProtectedComponent({
  children,
  title,
  description,
}: {
  children: JSX.Element
  title: string
  description: string
}) {
  const [isLogin, setLogin] = useState(false)
  const { user, isLoading } = useUser()

  return isLoading ? (
    <div className="p-6">Loading...</div>
  ) : user ? (
    <>{children}</>
  ) : (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="prose">
          <h3 className="flex items-center justify-center gap-2 text-center leading-none">
            <HiLockClosed className="inline-block" />
            {title}
          </h3>
          <p className="text-center">{description}</p>
        </div>
        <div className="divider"></div>
      </div>

      {isLogin && <Login />}
      {!isLogin && <SignUp />}

      <span className="label justify-start ">
        {isLogin ? 'You dont an account?' : 'Already have an account?'}
        <button
          className="link-primary link ml-1 p-0"
          onClick={() => setLogin((prevState) => !prevState)}
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </span>
    </div>
  )
}
