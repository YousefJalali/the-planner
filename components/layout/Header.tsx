import Head from 'next/head'
import { FC } from 'react'
import { x } from '@xstyled/styled-components'

const Header: FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        ></meta>
        <meta charSet='utf-8' />
      </Head>
      <x.header
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={4}
      >
        {children}
      </x.header>
    </>
  )
}

export default Header
