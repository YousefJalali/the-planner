import { x } from '@xstyled/styled-components'
import { FC } from 'react'
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
      <x.div
        backgroundColor='layout-level0'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        p={3}
        borderBottom='1px solid'
        borderColor='layout-divider'
        position='sticky'
        zIndex={1}
        w='100%'
        top='0px'
      >
        <x.div>
          <x.a onClick={onClose}>Cancel</x.a>
        </x.div>

        <x.span color='content-contrast' fontWeight='bold'>
          {title}
        </x.span>
        <x.label htmlFor={id} color='brand-primary'>
          <x.a>Submit</x.a>
        </x.label>
      </x.div>
      <x.div backgroundColor='layout-level0' p={3}>
        {children}
      </x.div>
    </>
  )
}

export default FormModal
