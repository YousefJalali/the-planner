import { FC } from 'react'
import { Box, Text } from '../../styles'

type Props = {
  variant: 'proposed' | 'in progress' | 'completed'
}
const Tag: FC<Props> = ({ variant }) => {
  const v = `tag.${variant.replace(' ', '')}`

  return (
    <Box backgroundColor={`${v}.bg`} borderRadius={2} width='fit-content'>
      <Text color={`${v}.color`} p={0} fontSize={0} letterSpacing={1}>
        {variant.toUpperCase()}
      </Text>
    </Box>
  )
}

export default Tag
