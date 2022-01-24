import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import Button from '../../styles/components/ButtonStyle'
import { Text } from '../../styles'

type Props = {
  variant: 'primary' | 'secondary' | 'textOnly'
  text: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const ButtonComp: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant,
  text,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <Button variant={variant} {...props}>
      {leftIcon}
      <Text as='span' fontSize={2} lineHeight={1} letterSpacing={1}>
        {text}
      </Text>
      {rightIcon}
    </Button>
  )
}

export default ButtonComp
