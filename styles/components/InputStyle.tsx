import styled, { css } from 'styled-components'

type WrapperProps = {
  success?: boolean
  focus?: boolean
  hasError?: boolean
}

const Wrapper = styled.div<WrapperProps>`
  background-color: transparent;
  border-radius: ${({ theme: { radii } }) => `${radii[3]}px `};
  border: 1px solid ${({ theme: { colors } }) => colors.layout.divider};
  transition: all 0.2s ease-out;

  ${({ focus, success, hasError, theme: { colors } }) =>
    css`
      border-color: ${(focus && colors.brand.primary) ||
      (success && colors.utility.confirmation) ||
      (hasError && colors.utility.critical)};
    `}
`

const InputStyle = {
  Wrapper,
}

export default InputStyle
