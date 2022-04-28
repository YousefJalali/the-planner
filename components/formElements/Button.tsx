import styled, {
  SystemProp,
  x,
  PositionProps,
  SpaceProps,
  LayoutProps,
  WidthProps,
  MarginProps,
  BoxShadowProps,
  Theme,
  JustifyContentProps,
  FlexProps,
  css,
} from '@xstyled/styled-components'
import { ButtonHTMLAttributes, FC } from 'react'
import Spinner from '../Spinner'

type Props = {
  variant?: 'outline' | 'textOnly' | 'link'
  color?: 'confirmation' | 'critical' | 'information'
  size?: 'small' | 'large'
  isLoading?: boolean
}

type AllProps = {
  children: JSX.Element | string
} & Props &
  SystemProp<
    | PositionProps
    | SpaceProps
    | LayoutProps
    | WidthProps
    | MarginProps
    | BoxShadowProps
    | JustifyContentProps
    | FlexProps,
    Theme
  > &
  ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled(x.button)<Pick<Props, 'size'>>`
  text-transform: capitalize;

  > svg {
    margin-right: 2;

    ${(props) =>
      props.size === 'small' &&
      css`
        margin-right: 1;
      `}
  }
`

const Button: FC<AllProps> = ({
  variant,
  color,
  size,
  children,
  isLoading,
  ...props
}) => {
  const spinnerSize =
    size === 'large' ? '1.125rem' : size === 'small' ? '0.889rem' : '1rem'

  return (
    <StyledButton
      as={variant === 'link' || variant === 'textOnly' ? 'a' : 'button'}
      size={size}
      px={
        variant === 'link' || variant === 'textOnly'
          ? 0
          : size === 'large'
          ? 4
          : size === 'small'
          ? 2
          : 3
      }
      py={
        variant === 'link' || variant === 'textOnly'
          ? 0
          : size === 'large'
          ? 3
          : size === 'small'
          ? 1
          : 2
      }
      fontSize={size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'default'}
      lineHeight={
        variant === 'link' || variant === 'textOnly' ? 'normal' : 'none'
      }
      borderRadius={2}
      display='flex'
      alignItems='center'
      backgroundColor={
        (variant && 'transparent') ||
        (color && `utility-${color}`) ||
        'brand-primary'
      }
      color={
        (!variant && 'layout-level0') ||
        (color && `utility-${color}`) ||
        'brand-primary'
      }
      border='1px solid'
      borderColor={
        variant !== 'outline'
          ? 'transparent'
          : color
          ? `utility-${color}`
          : 'brand-primary'
      }
      textDecoration={(variant === 'link' && 'underline') || 'none'}
      {...props}
    >
      {isLoading ? (
        <Spinner
          h={spinnerSize}
          w={spinnerSize}
          border={size === 'small' ? '2px solid' : '3px solid'}
          borderTop={size === 'small' ? '2px solid' : '3px solid'}
          trailColor='content-nonessential'
        />
      ) : (
        children
      )}
    </StyledButton>
  )
}

export default Button
