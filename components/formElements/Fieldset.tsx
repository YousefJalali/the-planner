import { FieldError } from 'react-hook-form'
import styled, { css, x } from '@xstyled/styled-components'
import _ from 'lodash'

export const Label = styled(x.label)`
  color: content-subtle;
  display: block;
  /* margin-bottom: 1; */
  font-size: sm;
  line-height: relaxed;
  &::first-letter {
    text-transform: uppercase;
  }
`

type WrapperProps = {
  success?: boolean
  error?: boolean
  noBorder?: boolean
  width?: string
}

const Wrapper = styled.div<WrapperProps>`
  width: ${(props) => (props.width === 'fit' ? 'fit-content' : '100%')};
  position: relative;

  padding: 0;

  border-radius: 2;
  border: 1px solid;
  border-color: layout-divider;
  box-shadow: none;
  transition: all 0.2s ease-out;

  input,
  textarea,
  button {
    border-radius: 2;
    padding: 3 2;
    background-color: layout-level0;
    width: ${(props) => (props.width === 'fit' ? 'fit-content' : '100%')};
  }

  &:focus-within {
    border-color: brand-primary;
  }

  ${({ success, error, theme: { colors } }) => css`
    border-color: ${(success && 'utility.confirmation') ||
    (error && 'utility-critical')};
  `}

  ${({ noBorder }) => css`
    border: ${noBorder && 'none'};
  `}
`

const Fieldset = styled.fieldset`
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

const SupportiveText = styled.span`
  font-size: xs;
  line-height: tighter;
  color: content-subtle;
  display: block;
  margin-top: 1;

  &:first-letter {
    text-transform: uppercase;
  }
`
const ErrorMessage = styled(SupportiveText)<{ error?: boolean }>`
  color: utility-critical;
`

type Props = {
  children: JSX.Element
  label?: string
  showLabel?: boolean
  supportiveText?: string
  disabled?: boolean
  error?: FieldError | FieldError[] | undefined
  noErrorMessage?: boolean
  noBorder?: boolean
  optionalField?: boolean
  id?: string
  width?: 'fit' | 'full'
}

function FieldsetComp({
  label,
  showLabel = true,
  disabled,
  error,
  noErrorMessage = false,
  children,
  supportiveText,
  noBorder = false,
  optionalField,
  id,
  width,
}: Props) {
  const isError = _.isObject(error) || _.isArray(error)

  return (
    <Fieldset disabled={disabled}>
      {label && (
        <Label
          color={isError && 'utility-critical'}
          htmlFor={id}
          visibility={showLabel ? 'visible' : 'hidden'}
        >
          {label}{' '}
          {optionalField && (
            <x.span color='content-nonessential'>(optional)</x.span>
          )}
        </Label>
      )}
      <Wrapper error={isError} noBorder={noBorder} width={width}>
        {children}
      </Wrapper>

      {supportiveText && (
        <SupportiveText as='span'>{supportiveText}</SupportiveText>
      )}

      {!noErrorMessage && _.isArray(error) && (
        <x.ul>
          {error.map((err, i) => (
            <li key={i}>
              <ErrorMessage as='span'>• {err.message}</ErrorMessage>
            </li>
          ))}
        </x.ul>
      )}

      {!noErrorMessage && _.isObject(error) && !(error instanceof Array) && (
        <ErrorMessage as='span'>• {error.message}</ErrorMessage>
      )}
    </Fieldset>
  )
}

export default FieldsetComp
