import styled, { css, x } from '@xstyled/styled-components'

type Props = {
  success?: boolean
  error?: boolean
  hideLabel?: boolean
  leftIcon?: boolean
}

export const StatusIcon = styled(x.span)`
  display: block;
  width: fit-content;
  position: absolute;
  right: 2;
  top: 50%;
  transform: translateY(-50%);

  > svg {
    height: 1.2rem;
    width: 1.2rem;
    color: content-nonessential;
  }
`

export const LeftIcon = styled(StatusIcon)`
  right: none;
  left: 2;
`

export const Field = styled(x.fieldset)<Props>`
  position: relative;

  > input,
  > textarea,
  > button,
  > :nth-child(2) {
    border: 1px solid;
    border-color: layout-divider;
    border-radius: 2;
    padding: 3 2;
    width: 100%;
    background-color: layout-level0;

    &:focus-within {
      border-color: brand-primary;
      transition: all 0.2s ease-out;
    }
  }

  ${({ leftIcon }) => css`
    > input,
    > textarea,
    > button,
    > :nth-child(2) {
      padding-left: ${leftIcon && 5};
    }
  `}

  ${({ success, error }) => css`
    label {
      color: ${(success && 'utility.confirmation') ||
      (error && 'utility-critical')};

      border-color: ${(success && 'utility.confirmation') ||
      (error && 'utility-critical')};
    }

    > input,
    > textarea,
    > button,
    > :nth-child(2) {
      border-color: ${(success && 'utility-confirmation') ||
      (error && 'utility-critical')};

      padding-right: ${(success || error) && 5};
    }
  `}

  ${({ hideLabel }) =>
    hideLabel &&
    css`
      label {
        visibility: hidden;
      }
    `}

  &:disabled {
    > input,
    > textarea,
    > button,
    > :nth-child(2) {
      background-color: layout-level1accent;
    }
  }
`
