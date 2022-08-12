import { StatusIcon } from './fieldset.style'
import { FiAlertTriangle, FiCheck } from 'react-icons/fi'
import { memo } from 'react'

type Props = {
  isError: boolean | undefined
  isSuccess: boolean | undefined
}

export const FieldStatusIcon = memo(({ isError, isSuccess }: Props) => {
  return isError || isSuccess ? (
    <StatusIcon color={isError ? 'utility-critical' : 'utility-confirmation'}>
      {isError ? <FiAlertTriangle /> : <FiCheck />}
    </StatusIcon>
  ) : null
})

export default FieldStatusIcon
