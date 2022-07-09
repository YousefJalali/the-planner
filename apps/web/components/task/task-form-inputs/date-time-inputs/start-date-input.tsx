import { DateInput, Fieldset } from '@the-planner/ui-web'
import { dateFormatPattern } from '@the-planner/utils'
import { Controller } from 'react-hook-form'
import { FormProps, GetValues } from '../FormProps'

export const StartDate = ({
  control,
  formName,
  getValues,
}: FormProps & GetValues) => {
  return (
    <Controller
      name="startDate"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset id={`${formName}-startDate`} label="from">
            <DateInput
              id={`${formName}-startDate`}
              dataTestId="task-form-start-date"
              selectsStart
              selected={value}
              onChange={onChange}
              startDate={value}
              endDate={getValues('endDate')}
              popperPlacement="bottom-start"
              placeholderText="Click to select a date"
              dateFormat={dateFormatPattern(value)}
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default StartDate
