import { Fieldset, TextEditor } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import { FormProps } from './FormProps'

export const Description = ({ control, formName }: FormProps) => {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset
            id={`${formName}-description`}
            label="description"
            error={error}
            optionalField
          >
            <TextEditor
              id={`${formName}-description`}
              value={value}
              onChange={onChange}
              placeholder="A brief about the task..."
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default Description
