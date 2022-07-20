import { ControllerFieldState } from 'react-hook-form'
import {
  BorderProps,
  FlexProps,
  DisplayProps,
  SpaceProps,
  WidthProps,
} from '@xstyled/styled-components'
import * as _ from 'lodash'
import { Label } from '@the-planner/ui-web'
import { Field, LeftIcon, StatusIcon } from './fieldset.style'
import { FieldError, SupportiveText } from '.'
import { FiAlertTriangle, FiCheck } from 'react-icons/fi'

type StyleProps = {} & BorderProps &
  FlexProps &
  DisplayProps &
  SpaceProps &
  WidthProps

export type FieldsetProps = {
  id?: string
  children: JSX.Element
  label?: string
  hideLabel?: boolean
  disabled?: boolean
  supportiveText?: string
  optionalField?: boolean
  fieldState?: ControllerFieldState
  leftIcon?: JSX.Element
} & StyleProps

export function Fieldset({
  id,
  children,
  label,
  hideLabel = false,
  supportiveText,
  disabled,
  optionalField,
  fieldState,
  leftIcon,
  ...props
}: FieldsetProps) {
  const { error, isDirty } = { ...fieldState }

  const isError = _.isObject(error) || _.isArray(error)

  return (
    <Field
      w="100%"
      disabled={disabled}
      error={isError}
      success={!isError && isDirty}
      hideLabel={hideLabel}
      leftIcon={leftIcon !== undefined}
      {...props}
    >
      {label && (
        <Label htmlFor={id} optional={optionalField}>
          {label}
        </Label>
      )}

      <>{children}</>

      {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}

      {isError && (
        <StatusIcon color="utility-critical">
          <FiAlertTriangle />
        </StatusIcon>
      )}

      {!isError && isDirty && (
        <StatusIcon color="utility-confirmation">
          <FiCheck />
        </StatusIcon>
      )}

      {supportiveText && <SupportiveText>{supportiveText}</SupportiveText>}

      <FieldError error={error} />
    </Field>
  )
}

Fieldset.SupportiveText = SupportiveText

export default Fieldset
