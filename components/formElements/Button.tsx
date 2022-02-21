import { x } from '@xstyled/styled-components'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type Props = {
  variant: 'primary' | 'secondary' | 'textOnly'
  children: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const ButtonComp: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant,
  children,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <x.button {...props}>
      {leftIcon}
      <x.span fontSize={2} lineHeight={1} letterSpacing={1}>
        {children}
      </x.span>
      {rightIcon}
    </x.button>
  )
}

export default ButtonComp
