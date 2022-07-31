import { TaskType } from '@the-planner/types'
import { Fieldset, FormControl, TimeInput } from '@the-planner/ui-web'

export const StartTime = () => (
  <FormControl<TaskType, Date> name="startTime">
    {({ id, field: { value, onChange }, fieldStatus, methods: { watch } }) => (
      <Fieldset
        data-testid={id}
        fieldStatus={fieldStatus}
        label="start time"
        hideLabel
        disabled={watch('openTask')}
      >
        <TimeInput
          id={id}
          dataTestId="task-form-start-time"
          selected={value}
          onChange={onChange}
          disabled={watch('openTask')}
        />
      </Fieldset>
    )}
  </FormControl>
)

export const EndTime = () => (
  <FormControl<TaskType, Date> name="endTime">
    {({ id, field: { value, onChange }, fieldStatus, methods: { watch } }) => (
      <Fieldset
        data-testid={id}
        fieldStatus={fieldStatus}
        label="end time"
        hideLabel
        disabled={watch('openTask')}
      >
        <TimeInput
          id={id}
          dataTestId="task-form-end-time"
          selected={value}
          onChange={onChange}
          disabled={watch('openTask')}
        />
      </Fieldset>
    )}
  </FormControl>
)
