import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiX } from 'react-icons/fi'
import Button from '../formElements/Button'

type Props = {
  title: string
  onRequestClose?: () => void
}

const FormHeader: FC<Props> = ({ title, onRequestClose }) => {
  return (
    <x.div
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      position='sticky'
      top={0}
      zIndex={1}
      backgroundColor='layout-level0'
      py={1}
      // borderBottom='1px solid'
      // borderBottomColor='layout-level0accent'
    >
      <x.h1 text='headline.one'>{title}</x.h1>
      {onRequestClose && (
        <Button
          variant='textOnly'
          onClick={onRequestClose}
          borderRadius='full'
          flex='0 0 48px'
          backgroundColor='layout-level0accent'
        >
          <x.span fontSize='1.5rem' color='content-contrast'>
            <FiX />
          </x.span>
        </Button>
      )}
    </x.div>
  )
}

export default FormHeader
