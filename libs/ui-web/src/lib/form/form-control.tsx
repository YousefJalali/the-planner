import { Fieldset, Label } from '@the-planner/ui-web'
import { Children, cloneElement } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  formName?: string
  name: string
  children: JSX.Element
  label: string
  disabled?: boolean
  hideLabel?: boolean
}

export const FormControl = ({
  formName,
  name,
  label,
  children,
  disabled,
  hideLabel,
}: Props) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset
            id={`${formName}-${name}`}
            label={label}
            error={error}
            disabled={disabled}
            hideLabel={hideLabel}
          >
            {Children.map(children, (child) => {
              return cloneElement(child, {
                value: value as string,
                onChange,
                error,
                id: `${formName}-${name}`,
              })
            })}
          </Fieldset>
        )
      }}
    />
  )
}

export default FormControl
