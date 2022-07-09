import { ToggleButton } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import { FormProps } from '../FormProps'

export const OpenTask = ({ control, formName }: FormProps) => {
  return (
    <Controller
      name="openTask"
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <ToggleButton
            id={`${formName}-openTask`}
            checked={value}
            onChange={onChange}
            height={24}
          />
        )
      }}
    />
  )
}

export default OpenTask
