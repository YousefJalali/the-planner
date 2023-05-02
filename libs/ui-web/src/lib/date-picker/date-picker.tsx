import { forwardRef } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from './date-picker.style'
import { Input } from '@the-planner/ui-web'

export type DateInputProps = {
  dataTestId?: string
} & ReactDatePickerProps

const DefaultCustomInput = forwardRef<HTMLInputElement>((props, ref) => (
  // <Input {...props} />
  <input className="input-bordered input" {...props} />
))
DefaultCustomInput.displayName = 'DefaultCustomInput'

export function DateInput(props: DateInputProps) {
  return (
    <div className="date-picker">
      <DatePicker
        {...props}
        autoComplete="off"
        onFocus={() => {
          if (document.activeElement) {
            ;(document.activeElement as HTMLInputElement).blur()
          }
        }}
        customInput={
          props.customInput || (
            <DefaultCustomInput data-testid={props.dataTestId} />
          )
        }
      />
    </div>
  )
}

export default DateInput
