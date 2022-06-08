import Head from 'next/head'
import { FC } from 'react'
import { x } from '@xstyled/styled-components'

type Props = {
  children: JSX.Element | JSX.Element[]
  pageTitle: string
}
const Header: FC<Props> = ({ children, pageTitle = '' }) => {
  return (
    <>
      <Head>
        <title>Za Blanner {pageTitle !== '' ? `| ${pageTitle}` : ''}</title>
        <meta charSet='utf-8' />
      </Head>
      <x.header
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        pt={2}
        mb={4}
      >
        {children}
      </x.header>
    </>
  )
}

export default Header
