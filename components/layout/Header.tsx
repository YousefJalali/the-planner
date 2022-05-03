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
        {/* <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        ></meta> */}
        <meta charSet='utf-8' />
      </Head>
      <x.header
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        pt={2}
        px={4}
        mb={4}
      >
        {children}
      </x.header>
    </>
  )
}

export default Header
