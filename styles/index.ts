import { ReactNode } from 'react'
import styled from 'styled-components'
import {
  space,
  position,
  layout,
  color,
  variant,
  typography,
  background,
  border,
  shadow,
  flexbox,
  LayoutProps,
  SpaceProps,
  PositionProps,
  ColorProps,
  BorderProps,
  ShadowProps,
  FlexboxProps,
  TypographyProps,
  BackgroundProps,
} from 'styled-system'

//-----------Box--------------

interface BoxProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BorderProps,
    ShadowProps,
    FlexboxProps,
    BackgroundProps,
    PositionProps {}

const Box = styled.div<BoxProps>`
  ${space}
  ${position}
  ${layout}
  ${color}
  ${border}
  ${shadow}
  ${flexbox}
  ${background}
`

//-----------Text--------------
const Text = styled.p<ColorProps & TypographyProps & SpaceProps>`
  font-family: 'DM Sans';
  ${space}
  ${typography}
  ${color}
`

//-----------Headlines--------------
interface HeadlineProps {
  level: 'one' | 'two' | 'three'
}
const Headline = styled('h1')<SpaceProps & HeadlineProps>(
  variant({
    prop: 'level',
    variants: {
      one: {
        fontSize: 6,
        lineHeight: 0,
        fontWeight: 'light',
        color: 'content.subtle',
        letterSpacing: -1,
      },
      two: {
        fontSize: 5,
        lineHeight: 0,
        fontWeight: 'light',
        color: 'content.subtle',
        letterSpacing: -0.75,
      },
      three: {
        fontSize: 4,
        lineHeight: 1,
        fontWeight: 'bold',
        color: 'content.contrast',
        letterSpacing: -0.33,
        fontFamily: 'Montserrat',
      },
    },
  }),
  color,
  typography,
  space
)

interface SubheadProps {
  size: 'small' | 'default' | 'subtle'
}
const Subhead = styled('h2')<SpaceProps & SubheadProps>(
  variant({
    prop: 'size',
    variants: {
      small: {
        fontSize: 1,
        lineHeight: 0,
        fontWeight: 'bold',
        color: 'content.contrast',
      },
      default: {
        fontSize: 2,
        lineHeight: 0,
        fontWeight: 'bold',
        color: 'content.contrast',
      },
      subtle: {
        fontSize: 1,
        lineHeight: 0,
        fontWeight: 'default',
        color: 'content.subtle',
        // fontFamily: 'Montserrat',
      },
    },
  }),
  color,
  typography,
  space
)

interface BodyProps {
  size: 'micro' | 'small' | 'default' | 'large'
}
const Body = styled('p')<BodyProps & ColorProps & TypographyProps>(
  variant({
    prop: 'size',
    variants: {
      micro: {
        fontSize: 0,
        lineHeight: 2,
        fontWeight: 'bold',
        color: 'content.default',
      },
      small: {
        fontSize: 1,
        lineHeight: 2,
        fontWeight: 'default',
        color: 'content.default',
      },
      default: {
        fontSize: 2,
        lineHeight: 2,
        fontWeight: 'default',
        color: 'content.default',
      },
      large: {
        fontSize: 3,
        lineHeight: 2,
        fontWeight: 'light',
        color: 'content.default',
      },
    },
  }),
  color,
  typography
)

const ItemTitle = styled('span')(
  {
    appearance: 'none',
    fontFamily: 'inherit',
  },
  variant({
    prop: 'size',
    variants: {
      small: {
        fontSize: '10px',
        lineHeight: 0,
        fontWeight: 'bold',
        color: 'content.nonessential',
      },
      default: {
        fontSize: 2,
        lineHeight: 0,
        fontWeight: 'bold',
        color: 'content.nonessential',
      },
    },
  }),
  color,
  typography
)

export { Box, Text, Headline, Subhead, Body, ItemTitle }
