import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from '../../styles/DatePickerStyle'

type Props = {} & ReactDatePickerProps

function DateInput(props: Props) {
  return (
    <DatePickerWrapper>
      <DatePicker {...props} />
    </DatePickerWrapper>
  )
}

export default DateInput
