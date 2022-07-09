import { Fieldset } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import {
  EndDate,
  EndTime,
  OpenTask,
  StartDate,
  StartTime,
} from './date-time-inputs'
import { FormErrors, FormProps, GetValues, Watch } from './FormProps'

export const DateAndTime = ({
  control,
  formName,
  getValues,
  watch,
  errors,
}: FormProps & GetValues & Watch & FormErrors) => {
  return (
    <Fieldset
      label="date"
      hideLabel
      id={`${formName}-date`}
      error={errors}
      supportiveText="End date & end time are optional"
      border="0px solid"
    >
      <>
        <x.div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <x.span>Date & Time</x.span>
          <x.div display="flex" alignItems="center">
            <x.span mr={2}>Open task?</x.span>

            <OpenTask control={control} formName={formName} />
          </x.div>
        </x.div>

        {/* Start Date */}
        <x.div display="flex">
          <x.div flex="0 0 calc(100% - 8px - 85px)">
            <StartDate
              control={control}
              formName={formName}
              getValues={getValues}
            />
          </x.div>

          {/* Start Time */}
          <x.div w={85} ml={2}>
            <StartTime control={control} formName={formName} watch={watch} />
          </x.div>
        </x.div>

        {/* End Date */}
        <x.div display="flex" mt={3}>
          <x.div flex="0 0 calc(100% - 8px - 85px)">
            <EndDate
              control={control}
              formName={formName}
              getValues={getValues}
              watch={watch}
            />
          </x.div>

          {/* End Time */}
          <x.div w={85} ml={2}>
            <EndTime control={control} formName={formName} watch={watch} />
          </x.div>
        </x.div>
      </>
    </Fieldset>
  )
}

export default DateAndTime
