import { memo } from 'react'
import { LeftIcon } from './fieldset.style'

const FieldIcon = memo(({ children }: { children: JSX.Element }) => {
  return <LeftIcon>{children}</LeftIcon>
})

export default FieldIcon
