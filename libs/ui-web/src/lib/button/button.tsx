import {
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
  BorderRadiusProps,
  BackgroundColorProps,
  BorderColorProps,
} from '@xstyled/styled-components'
import { ButtonHTMLAttributes, FC } from 'react'
import { Spinner } from '@the-planner/ui-web'

type Props = {
  name: string
  as?: string
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
    | BorderRadiusProps
    | BackgroundColorProps
    | BorderColorProps
    | FlexProps,
    Theme
  > &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<AllProps> = ({
  name,
  as = 'button',
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
    <x.button
      type="button"
      name={name}
      aria-label={name}
      minHeight={36}
      minWidth={36}
      h="fit-content"
      w="fit-content"
      px={
        variant === 'link' || variant === 'textOnly'
          ? 2
          : size === 'large'
          ? 4
          : size === 'small'
          ? 2
          : 3
      }
      py={
        variant === 'link' || variant === 'textOnly'
          ? 2
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
      display="flex"
      alignItems="center"
      justifyContent="center"
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
      border="1px solid"
      borderColor={
        variant !== 'outline'
          ? 'transparent'
          : color
          ? `utility-${color}`
          : 'brand-primary'
      }
      textDecoration={(variant === 'link' && 'underline') || 'none'}
      textTransform="capitalize"
      // outline={{ focus: 'none' }}
      // ring={{ focus: 2 }}
      // ringColor={{ focus: 'red' }}
      {...props}
    >
      {isLoading ? (
        <Spinner
          h={spinnerSize}
          w={spinnerSize}
          border={size === 'small' ? '2px solid' : '3px solid'}
          borderTop={size === 'small' ? '2px solid' : '3px solid'}
          trailColor="content-nonessential"
        />
      ) : (
        children
      )}
    </x.button>
  )
}

export default Button
