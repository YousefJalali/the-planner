import { x } from '@xstyled/styled-components'
import { LabelHTMLAttributes, memo } from 'react'

type LabelProps = {
  children: string
  optional?: boolean
  error?: boolean
  hidden?: boolean
} & LabelHTMLAttributes<HTMLLabelElement>

export const Label = memo(
  ({
    children,
    optional = false,
    error = false,
    hidden = false,
    ...props
  }: LabelProps) => {
    return (
      <x.label
        display="block"
        font-size="sm"
        lineHeight="relaxed"
        color={error ? 'utility-critical' : 'content-subtle'}
        textTransform={{ firstLetter: 'uppercase' }}
        visibility={hidden ? 'hidden' : 'visible'}
        {...props}
      >
        {children}{' '}
        {optional && <x.span color="content-nonessential">(optional)</x.span>}
      </x.label>
    )
  }
)

export default Label
