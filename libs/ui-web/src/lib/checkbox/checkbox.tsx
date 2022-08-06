import styled, { x } from '@xstyled/styled-components'
import { FC } from 'react'
import Wrapper from './checkbox-wrapper'

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
      cursor="pointer"
    >
      <Wrapper color={color} checked={checked} />

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
