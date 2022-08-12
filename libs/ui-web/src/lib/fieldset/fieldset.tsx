import { memo } from 'react'
import { FieldError as FieldErrorProps } from 'react-hook-form'
import {
  BorderProps,
  FlexProps,
  DisplayProps,
  SpaceProps,
  WidthProps,
} from '@xstyled/styled-components'
import * as _ from 'lodash'
import { Label } from '@the-planner/ui-web'
import { Field, InputWrapper, LeftIcon } from './fieldset.style'
import { FieldError, SupportiveText } from '.'
import FieldStatusIcon from './field-status-icon'
import FieldIcon from './field-icon'

type StyleProps = {} & BorderProps &
  FlexProps &
  DisplayProps &
  SpaceProps &
  WidthProps

export type FieldStatus = {
  error?: FieldErrorProps
  isSuccess?: boolean
  isLoading?: boolean
}

export type FieldsetProps = {
  id?: string
  children: JSX.Element
  label?: string
  hideLabel?: boolean
  disabled?: boolean
  supportiveText?: string
  optionalField?: boolean
  fieldStatus?: FieldStatus
  leftIcon?: JSX.Element
} & StyleProps

export const Fieldset = memo(
  ({
    id,
    children,
    label,
    hideLabel = false,
    supportiveText,
    disabled,
    optionalField,
    fieldStatus,
    leftIcon,
    ...props
  }: FieldsetProps) => {
    const { error, isSuccess } = { ...fieldStatus }

    const isError = _.isObject(error) || _.isArray(error)

    return (
      <Field
        w="100%"
        disabled={disabled}
        error={isError}
        success={isSuccess}
        hideLabel={hideLabel}
        leftIcon={leftIcon !== undefined}
        {...props}
      >
        {label && (
          <Label htmlFor={id} optional={optionalField}>
            {label}
          </Label>
        )}

        <InputWrapper>
          {leftIcon && <FieldIcon>{leftIcon}</FieldIcon>}

          {children}

          <FieldStatusIcon isError={isError} isSuccess={isSuccess} />
        </InputWrapper>

        {supportiveText && <SupportiveText>{supportiveText}</SupportiveText>}

        <FieldError error={error} />
      </Field>
    )
  }
)

// Fieldset.SupportiveText = SupportiveText

export default Fieldset
