import { DateInput, Fieldset } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import { FormProps, Watch } from '../FormProps'

export const EndTime = ({ control, formName, watch }: FormProps & Watch) => {
  return (
    <Controller
      name="endTime"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset
            label="end time"
            hideLabel
            id={`${formName}-endTime`}
            disabled={watch('openTask')}
          >
            <DateInput
              id={`${formName}-endTime`}
              dataTestId="task-form-end-time"
              selected={value}
              onChange={onChange}
              disabled={watch('openTask')}
              popperPlacement="bottom-end"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption=""
              dateFormat="h:mm aa"
              placeholderText="hh:mm"
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default EndTime
