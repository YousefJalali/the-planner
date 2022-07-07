import styled, { css, x } from '@xstyled/styled-components'

type WrapperProps = {
  success?: boolean
  error?: boolean
}

export const Wrapper = styled(x.div)<WrapperProps>`
  width: 100%;
  position: relative;

  padding: 0;

  border-radius: 2;
  box-shadow: none;
  transition: all 0.2s ease-out;

  input,
  textarea,
  button {
    border-radius: 2;
    padding: 3 2;
    width: 100%;
    background-color: layout-level0;
  }

  &:focus-within {
    border-color: brand-primary;
  }

  ${({ success, error }) => css`
    border-color: ${(success && 'utility.confirmation') ||
    (error && 'utility-critical')};
  `}
`

export const Field = styled.fieldset`
  &:disabled {
    ${Wrapper} {
      input,
      textarea,
      button {
        background-color: layout-level1accent;
      }
    }
  }
`

export const SupportiveText = styled.span`
  font-size: xs;
  line-height: tighter;
  color: content-subtle;
  display: block;
  margin-top: 1;

  &:first-letter {
    text-transform: uppercase;
  }
`
export const ErrorMessage = styled(SupportiveText)<{ error?: boolean }>`
  color: utility-critical;
`
