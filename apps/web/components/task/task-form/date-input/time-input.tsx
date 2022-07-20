import { Fieldset, FormControl, TimeInput } from '@the-planner/ui-web'

export const StartTime = () => (
  <FormControl name="startTime">
    {({ id, field: { value, onChange }, fieldState, methods: { watch } }) => (
      <Fieldset
        id={id}
        fieldState={fieldState}
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
  <FormControl name="endTime">
    {({ id, field: { value, onChange }, fieldState, methods: { watch } }) => (
      <Fieldset
        id={id}
        fieldState={fieldState}
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
