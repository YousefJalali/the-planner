import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiXCircle } from 'react-icons/fi'
import Icon from '../Icon'

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
      mb={2}
      position='sticky'
      top={0}
      zIndex={1}
      backgroundColor='layout-level0'
      py={3}
    >
      <x.h1 text='headline.three'>{title}</x.h1>
      {onRequestClose && (
        <x.div onClick={onRequestClose}>
          <Icon icon={FiXCircle} size='1.4rem' />
        </x.div>
      )}
    </x.div>
  )
}

export default FormHeader
