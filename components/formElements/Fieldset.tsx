import { FieldError } from 'react-hook-form'
import Fieldset from '../../styles/components/FieldsetStyle'
import Label from '../../styles/components/LabelStyle'

type Props = {
  children: JSX.Element
  label?: string
  supportiveText?: string
  disabled?: boolean
  error: FieldError | undefined
}

function FieldsetComp(props: Props) {
  const { label, disabled, error, children, supportiveText } = props

  // console.log('error: ', error)

  return (
    <fieldset>
      {label && <Label color={error && 'utility.critical'}>{label}</Label>}
      <Fieldset.Wrapper error={error && true} disabled={disabled}>
        {children}
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
