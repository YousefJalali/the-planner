import { GetServerSideProps } from 'next'
import Link from 'next/link'
import AuthLayout from 'apps/web/components/ui/layout/AuthLayout'
import Login from 'apps/web/components/auth/Login'
import { isAuthenticated } from 'apps/web/config/isAuthenticated'

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <div className="prose text-center">
        <h1>Login</h1>
        <p>Welcome back! Please enter your login details to continue</p>
      </div>
      <div className="mt-8 rounded-xl bg-base-100 p-6 shadow">
        <Login />

        <span className="label mt-2 justify-start">
          You dont an account?
          <Link href="/auth/signup" className="px-1 text-primary underline">
            Sign up
          </Link>
        </span>
      </div>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await isAuthenticated(req)

  if (user) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
