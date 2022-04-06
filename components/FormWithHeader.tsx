import styled, { x } from '@xstyled/styled-components'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
  onClose: (action?: any) => void
  title: string
  id: string
}

const Header = styled(x.div)`
  backdrop-filter: blur(8px);
`

const FormModal: FC<Props> = ({ children, onClose, title, id }) => {
  return (
    <>
      <Header
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
        id={`${id}-header`}
      >
        <x.div>
          <x.a onClick={onClose}>Cancel</x.a>
        </x.div>

        <x.span color='content-contrast' fontWeight='bold'>
          {title}
        </x.span>
        <x.label
          id={`${id}-submit-label`}
          htmlFor={`${id}-submit`}
          color='brand-primary'
        >
          <x.a>Submit</x.a>
        </x.label>
      </Header>
      <x.div p={3}>{children}</x.div>
    </>
  )
}

export default FormModal
