import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import Button from '../../styles/components/ButtonStyle'
import { Text } from '../../styles'

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
    <Button variant={variant} {...props}>
      {leftIcon}
      <Text as='span' fontSize={2} lineHeight={1} letterSpacing={1}>
        {children}
      </Text>
      {rightIcon}
    </Button>
  )
}

export default ButtonComp
