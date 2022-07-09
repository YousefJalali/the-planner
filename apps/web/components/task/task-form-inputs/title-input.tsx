import { Fieldset, Input } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import { FormProps } from './FormProps'

export const Title = ({ control, formName }: FormProps) => {
  return (
    <Controller
      name="title"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset id={`${formName}-title`} label="Task title" error={error}>
            <Input
              id={`${formName}-title`}
              type="text"
              placeholder="i.e. speakers"
              value={value}
              onChange={onChange}
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default Title
