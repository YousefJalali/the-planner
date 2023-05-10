import { DateInput, DateInputProps } from './date-picker'

export const TimeInput = ({ dataTestId, ...props }: DateInputProps) => {
  return (
    <DateInput
      {...props}
      dataTestId={dataTestId}
      popperPlacement="bottom-end"
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={30}
      timeCaption=""
      dateFormat="h:mm aa"
      placeholderText="hh:mm"
    />
  )
}

export default TimeInput
