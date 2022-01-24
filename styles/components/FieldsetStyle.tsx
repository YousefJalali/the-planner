import styled, { css } from 'styled-components'

type WrapperProps = {
  focus?: boolean
  success?: boolean
  error?: boolean
}
const Wrapper = styled.fieldset<WrapperProps>`
  width: 100%;
  position: relative;

  padding: 0;
  background-color: ${({ theme: { colors } }) => colors.layout.level0};
  border-radius: ${({ theme: { radii } }) => `${radii[3]}px `};
  border: 1px solid ${({ theme: { colors } }) => colors.layout.divider};
  box-shadow: none;
  transition: all 0.2s ease-out;

  ${({ focus, success, error, theme: { colors } }) => css`
    border-color: ${(focus && colors.brand.primary) ||
    (success && colors.utility.confirmation) ||
    (error && colors.utility.critical)};
  `}

  &:disabled {
    background-color: ${({ theme: { colors } }) => colors.layout.level1accent};
  }
`

const SupportiveText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  line-height: ${({ theme }) => theme.lineHeights[1]};
  color: ${({ theme }) => theme.colors.content.subtle};
  display: inline-block;
  margin-top: ${({ theme: { space } }) => `${space[0]}px `};

  &:first-letter {
    text-transform: uppercase;
  }
`
const ErrorMessage = styled(SupportiveText)<{ error?: boolean }>`
  color: ${({ theme: { colors } }) => colors.utility.critical};
`

const Fieldset = {
  Wrapper,
  SupportiveText,
  ErrorMessage,
}

export default Fieldset
