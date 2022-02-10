import Head from 'next/head'
import { FC } from 'react'

import { Box } from '../../styles'

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
      <Box
        as='header'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        px={3}
        mt={2}
      >
        {children}
      </Box>
    </>
  )
}

export default Header
