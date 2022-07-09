import { FieldError } from 'react-hook-form'
import { x, BorderProps } from '@xstyled/styled-components'
import * as _ from 'lodash'
import { Label } from '@the-planner/ui-web'
import { ErrorMessage, Field, SupportiveText, Wrapper } from './fieldset.style'

type Props = {
  id?: string
  children: JSX.Element | JSX.Element[]
  label?: string
  hideLabel?: boolean
  supportiveText?: string
  disabled?: boolean
  error?: FieldError | FieldError[] | undefined
  optionalField?: boolean
} & BorderProps

export function Fieldset({
  id,
  children,
  label,
  hideLabel = false,
  supportiveText,
  disabled,
  error,
  optionalField,
  ...props
}: Props) {
  const isError = _.isObject(error) || _.isArray(error)

  return (
    <Field disabled={disabled}>
      {label && (
        <Label
          htmlFor={id}
          error={isError}
          hidden={hideLabel}
          optional={optionalField}
        >
          {label}
        </Label>
      )}

      <Wrapper
        error={isError}
        border="1px solid"
        borderColor="layout-divider"
        {...props}
      >
        {children}
      </Wrapper>

      {supportiveText && (
        <SupportiveText as="span">{supportiveText}</SupportiveText>
      )}

      {_.isArray(error) && (
        <x.ul>
          {error.map((err, i) => (
            <li key={i}>
              <ErrorMessage as="span">• {err.message}</ErrorMessage>
            </li>
          ))}
        </x.ul>
      )}

      {_.isObject(error) && !(error instanceof Array) && (
        <ErrorMessage as="span">{error.message}</ErrorMessage>
      )}
    </Field>
  )
}

export default Fieldset
