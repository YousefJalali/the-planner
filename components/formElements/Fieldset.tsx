import {
  useState,
  useEffect,
  InputHTMLAttributes,
  Children,
  cloneElement,
} from 'react'
import { FieldError } from 'react-hook-form'
import Fieldset from '../../styles/components/FieldsetStyle'
import Label from '../../styles/components/LabelStyle'
import { useController, UseControllerProps } from 'react-hook-form'

type Props<T> = {
  name: string
  children: JSX.Element
  focus?: boolean
  label?: string
  supportiveText?: string
  disabled?: boolean
  control: UseControllerProps<T>
}

function FieldsetComp<T>(props: Props<T>) {
  const { label, focus, disabled, children, supportiveText, control } = props
  console.log(props)

  const {
    field: { onChange, value, name },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController(control)

  return (
    <fieldset>
      {label && <Label color={error && 'utility.critical'}>{label}</Label>}
      <Fieldset.Wrapper focus={focus} error={error && true} disabled={disabled}>
        {Children.map(children, (child, index) =>
          cloneElement(child, { value, onChange })
        )}
      </Fieldset.Wrapper>

      {supportiveText && (
        <Fieldset.SupportiveText as='span'>
          {supportiveText}
        </Fieldset.SupportiveText>
      )}

      {error && (
        <Fieldset.ErrorMessage as='span'>{error.message}</Fieldset.ErrorMessage>
      )}
    </fieldset>
  )
}

export default FieldsetComp
// import { useState, useEffect, FC } from 'react'
// import { FieldError } from 'react-hook-form'
// import Fieldset from '../../styles/components/FieldsetStyle'
// import Label from '../../styles/components/LabelStyle'

// type Props = {
//   children: JSX.Element
//   error: FieldError | undefined
//   focus: boolean
//   label?: string
//   supportiveText?: string
//   disabled?: boolean
// }

// const FieldsetComp: FC<Props> = ({
//   error,
//   focus,
//   label,
//   supportiveText,
//   children,
//   disabled,
// }) => {
//   const [hasError, setError] = useState(false)

//   // console.log('error: ', error)

//   //update error state
//   useEffect(() => {
//     if (error) {
//       setError(true)
//     } else {
//       setError(false)
//     }
//   }, [error])

//   return (
//     <fieldset>
//       {label && <Label color={error && 'utility.critical'}>{label}</Label>}
//       <Fieldset.Wrapper focus={focus} error={hasError} disabled={disabled}>
//         {children}
//       </Fieldset.Wrapper>

//       {supportiveText && (
//         <Fieldset.SupportiveText as='span'>
//           {supportiveText}
//         </Fieldset.SupportiveText>
//       )}

//       {error && (
//         <Fieldset.ErrorMessage as='span'>{error.message}</Fieldset.ErrorMessage>
//       )}
//     </fieldset>
//   )
// }

// export default FieldsetComp
