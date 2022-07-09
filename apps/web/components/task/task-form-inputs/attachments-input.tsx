import { Fieldset, ImageInput } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import { FormProps } from './FormProps'

export const Attachments = ({ control, formName }: FormProps) => {
  return (
    <Controller
      name="attachments"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset
            label="attachments"
            id={`${formName}-attachments`}
            error={error}
            supportiveText={`Photos • ${value.length}/10 `}
            optionalField
            border="1px dashed"
          >
            <ImageInput
              id={`${formName}-attachments`}
              value={value}
              onChange={onChange}
              max={10}
              multiple
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default Attachments
