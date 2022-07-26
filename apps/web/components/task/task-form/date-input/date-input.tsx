import { TaskType } from '@the-planner/types'
import { DateInput, Fieldset, FormControl } from '@the-planner/ui-web'
import { dateFormatPattern } from '@the-planner/utils'
import { GridColumnProps } from '@xstyled/styled-components'

export const StartDate = ({ ...props }: GridColumnProps) => (
  <FormControl<TaskType, Date> name="startDate">
    {({
      id,
      field: { value, onChange },
      fieldStatus,
      methods: { getValues },
    }) => (
      <Fieldset id={id} label="from" fieldStatus={fieldStatus} {...props}>
        <DateInput
          id={id}
          dataTestId="task-form-start-date"
          selectsStart
          selected={value}
          onChange={onChange}
          startDate={value}
          endDate={getValues('endDate')}
          popperPlacement="bottom-start"
          placeholderText="Click to select a date"
          dateFormat={value ? dateFormatPattern(value) : undefined}
        />
      </Fieldset>
    )}
  </FormControl>
)

export const EndDate = ({ ...props }: GridColumnProps) => (
  <FormControl<TaskType, Date> name="endDate">
    {({
      id,
      field: { value, onChange },
      fieldStatus,
      methods: { getValues, watch },
    }) => (
      <Fieldset
        id={id}
        label="To"
        disabled={watch('openTask')}
        optionalField
        fieldStatus={fieldStatus}
        {...props}
      >
        <DateInput
          id={id}
          selected={value}
          onChange={onChange}
          popperPlacement="bottom-start"
          dataTestId="task-form-end-date"
          placeholderText="Due date"
          selectsEnd
          startDate={getValues('startDate')}
          endDate={value}
          minDate={getValues('startDate')}
          disabled={watch('openTask')}
          dateFormat={value ? dateFormatPattern(value) : undefined}
        />
      </Fieldset>
    )}
  </FormControl>
)
