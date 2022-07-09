import { DateInput, Fieldset } from '@the-planner/ui-web'
import { dateFormatPattern } from '@the-planner/utils'
import { Controller } from 'react-hook-form'
import { FormProps, GetValues, Watch } from '../FormProps'

export const EndDate = ({
  control,
  formName,
  getValues,
  watch,
}: FormProps & GetValues & Watch) => {
  return (
    <Controller
      name="endDate"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset
            id={`${formName}-endDate`}
            label="To"
            disabled={watch('openTask')}
            optionalField
          >
            <DateInput
              id={`${formName}-endDate`}
              dataTestId="task-form-end-date"
              selectsEnd
              selected={value}
              onChange={onChange}
              startDate={getValues('startDate')}
              endDate={value}
              minDate={getValues('startDate')}
              disabled={watch('openTask')}
              popperPlacement="bottom-start"
              placeholderText="Due date"
              dateFormat={value ? dateFormatPattern(value) : undefined}
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default EndDate
