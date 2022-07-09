import { DateInput, Fieldset } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import { FormProps, Watch } from '../FormProps'

export const StartTime = ({ control, formName, watch }: FormProps & Watch) => {
  return (
    <Controller
      name="startTime"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset
            label="start time"
            hideLabel
            id={`${formName}-startTime`}
            disabled={watch('openTask')}
          >
            <DateInput
              id={`${formName}-startTime`}
              dataTestId="task-form-start-time"
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

export default StartTime
