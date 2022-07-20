import {
  FieldError,
  FormControl,
  Label,
  SupportiveText,
  ToggleButton,
} from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { FieldError as FieldErrorProps, useFormContext } from 'react-hook-form'
import { EndDate, StartDate } from './date-input'
import { EndTime, StartTime } from './time-input'

export const DateTimeInput = () => {
  const {
    getValues,
    resetField,
    formState: { errors },
  } = useFormContext()

  const dateErrors: FieldErrorProps[] = useMemo(
    () => _.compact([_.get(errors, 'endDate'), _.get(errors, 'endTime')]),
    [errors]
  )

  useEffect(() => {
    if (getValues('openTask')) {
      resetField('endDate')
      resetField('startTime')
      resetField('endTime')
    }
  }, [getValues('openTask')])

  return (
    <x.div>
      <x.div display="flex" justifyContent="space-between">
        <Label>Date & Time</Label>
        <x.fieldset display="flex" alignItems="center">
          <x.span mr={2}>Open task?</x.span>

          <FormControl name="openTask">
            {({ id, field: { value, onChange } }) => (
              <ToggleButton
                id={id}
                checked={value}
                onChange={onChange}
                height={24}
              />
            )}
          </FormControl>
        </x.fieldset>
      </x.div>

      <x.div display="grid" gridTemplateColumns={3} gap={2}>
        <StartDate gridColumn="1 / 3" />
        <StartTime />

        <EndDate gridColumn="1 / 3" />
        <EndTime />
      </x.div>

      <SupportiveText>End date & end time are optional</SupportiveText>

      {/* <FieldError error={dateErrors} /> */}
    </x.div>
  )
}

export default DateTimeInput
