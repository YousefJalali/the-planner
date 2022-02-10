import { FC } from 'react'
import { Subhead, Text, Box } from '../styles'
import Modal from './layout/Modal'

type Props = {
  children: React.ReactNode
  onClose: () => void
  title: string
  id: string
}

const FormModal: FC<Props> = ({ children, onClose, title, id }) => {
  return (
    <>
      <Box
        backgroundColor='layout.level0'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        px={3}
        py={2}
        borderBottom='1px solid'
        borderColor='layout.divider'
        position='sticky'
        zIndex={1}
        width='100%'
        top='0px'
      >
        <Box>
          <Text as='a' onClick={onClose}>
            Cancel
          </Text>
        </Box>

        <Subhead as='h3' size='default'>
          {title}
        </Subhead>
        <Text as='label' htmlFor={id} color='brand.primary'>
          <Box as='a'>Submit</Box>
        </Text>
      </Box>
      <Box backgroundColor='layout.level0' p={3}>
        {children}
      </Box>
    </>
  )
}

export default FormModal
