import { x } from '@xstyled/styled-components'
import { ButtonHTMLAttributes, FC } from 'react'
import { IconBaseProps } from 'react-icons'
import Icon from '../Icon'

type Props = {
  variant?: 'primary' | 'secondary' | 'textOnly'
  size?: 'small' | 'default' | 'large'
  full?: boolean
  children: string
  leftIcon?: (props: IconBaseProps) => JSX.Element
  rightIcon?: (props: IconBaseProps) => JSX.Element
}

const ButtonComp: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary',
  size = 'default',
  full,
  children,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <x.button
      w={full ? '100%' : 'fit-content'}
      backgroundColor={variant === 'primary' ? 'brand-primary' : 'transparent'}
      px={size === 'small' ? 1 : 3}
      py={size === 'large' ? 3 : 2}
      borderRadius={2}
      display='flex'
      alignItems='center'
      {...props}
    >
      {leftIcon && (
        <Icon
          icon={leftIcon}
          color={variant === 'primary' ? 'layout-level0' : 'brand-primary'}
          size={
            size === 'small' ? '1rem' : size === 'large' ? '1.293rem' : '1.2rem'
          }
        />
      )}
      <x.span
        ml={leftIcon && size === 'small' ? 1 : 2}
        mr={rightIcon && size === 'small' ? 1 : 2}
        fontSize={size === 'small' ? 'xs' : size === 'large' ? 'lg' : 'default'}
        lineHeight='none'
        color={variant === 'primary' ? 'layout-level0' : 'brand-primary'}
        letterSpacing={0.5}
      >
        {children}
      </x.span>
      {rightIcon && (
        <Icon
          icon={rightIcon}
          color={variant === 'primary' ? 'layout-level0' : 'brand-primary'}
          size={
            size === 'small'
              ? '1.125rem'
              : size === 'large'
              ? '1.293rem'
              : '1.2rem'
          }
        />
      )}
    </x.button>
  )
}

export default ButtonComp
