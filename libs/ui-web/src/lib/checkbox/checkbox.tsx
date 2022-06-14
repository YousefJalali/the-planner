import styled, { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiCheck } from 'react-icons/fi'

const Container = styled(x.label)`
  svg {
    stroke-width: 4px;
  }
`

type Props = {
  checked: boolean
  onChange: () => void
  color: string
  id: string
}

export const Checkbox: FC<Props> = ({ checked, onChange, color, id }) => {
  return (
    <Container
      htmlFor={id}
      h={36}
      w={36}
      zIndex={101}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="full"
    >
      <x.span
        display="block"
        position="relative"
        w="50%"
        h="50%"
        minHeight={24}
        minWidth={24}
        backgroundColor={color}
        borderRadius="full"
      >
        <x.span
          display="flex"
          position="absolute"
          top="50%"
          left="50%"
          w="80%"
          h="80%"
          transform
          translateX="-50%"
          translateY="-50%"
          backgroundColor={checked ? color : 'layout-level0'}
          borderRadius="full"
          border="2px solid"
          borderColor="layout-level0"
          color="layout-level0"
          fontSize="60%"
          justifyContent="center"
          alignItems="center"
        >
          <FiCheck />
        </x.span>
      </x.span>

      <x.input
        id={id}
        data-testid={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        m={0}
        h={0}
        w={0}
        visibility="hidden"
      />
    </Container>
  )
}

export default Checkbox
