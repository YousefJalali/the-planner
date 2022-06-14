import { forwardRef } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from './DatePickerStyle'
import { Input } from '../input/input'

type Props = {
  dataTestId?: string
  customInput?: JSX.Element
} & ReactDatePickerProps

const DefaultCustomInput = forwardRef<HTMLInputElement>((props, ref) => (
  <Input {...props} />
))
DefaultCustomInput.displayName = 'DefaultCustomInput'

export function DateInput(props: Props) {
  return (
    <DatePickerWrapper>
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
    </DatePickerWrapper>
  )
}

export default DateInput
