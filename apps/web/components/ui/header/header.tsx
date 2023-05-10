import Head from 'next/head'
import { FC } from 'react'

type Props = {
  children: JSX.Element | JSX.Element[]
  pageTitle: string
  className?: string
}
export const Header: FC<Props> = ({ children, pageTitle = '', className }) => {
  return (
    <>
      <Head>
        <title>Za Blanner {pageTitle !== '' ? `| ${pageTitle}` : ''}</title>
        <meta charSet="utf-8" />
      </Head>
      <header className={`flex justify-between items-center px-6 ${className}`}>
        {children}
      </header>
    </>
  )
}

export default Header
