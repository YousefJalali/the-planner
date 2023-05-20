import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FiArrowLeft } from 'react-icons/fi'

export default function AuthLayout({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#F2F7FF"></meta>
        <title>The Planner | {title}</title>
      </Head>

      <header className="flex justify-between items-center px-6 py-3 lg:p-6 bg-base-200 lg:hidden">
        <Link href="/" className="btn btn-ghost btn-circle -ml-4">
          <FiArrowLeft size={24} />
        </Link>
      </header>

      <div className="flex min-h-screen flex-col justify-center bg-base-200 p-6 lg:mt-0">
        <div className="mx-auto w-full md:max-w-lg">{children}</div>
      </div>
    </>
  )
}
