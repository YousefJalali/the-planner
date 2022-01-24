import { FC } from 'react'

import { Box } from '../../styles'

const Header: FC = ({ children }) => {
  return (
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
  )
}

export default Header
