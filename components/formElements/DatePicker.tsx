import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from '../../styles/components/DatePickerStyle'

type Props = {} & ReactDatePickerProps

function DateInput(props: Props) {
  return (
    <DatePickerWrapper>
      <DatePicker {...props} />
    </DatePickerWrapper>
  )
}

export default DateInput
// import { useState } from 'react'
// import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { useController, UseControllerProps } from 'react-hook-form'
// import DatePickerWrapper from '../../styles/components/DatePickerStyle'
// import Fieldset from './Fieldset'

// type PopperProps = Omit<ReactDatePickerProps, 'onChange'>

// type Props<T> = {
//   label?: string
//   disabled?: boolean
// } & UseControllerProps<T> &
//   PopperProps

// function DateInput<T extends Record<string, any> = Record<string, any>>(
//   props: Props<T>
// ) {
//   const [focus, setFocus] = useState(false)

//   const onFocusHandler = () => setFocus(true)
//   const onBlurHandler = () => setFocus(false)

//   const {
//     field: { value, onChange },
//     fieldState: { invalid, isTouched, isDirty, error },
//     formState: { touchedFields, dirtyFields },
//   } = useController(props)

//   return (
//     <Fieldset
//       label={props.label}
//       focus={focus}
//       error={error}
//       disabled={props.disabled}
//     >
//       <DatePickerWrapper>
//         <DatePicker
//           {...props}
//           selected={new Date(value)}
//           onChange={onChange}
//           onFocus={onFocusHandler}
//           onBlur={onBlurHandler}
//         />
//       </DatePickerWrapper>
//     </Fieldset>
//   )
// }

// export default DateInput
