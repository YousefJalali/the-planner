import styled from 'styled-components'
import {
  space,
  layout,
  flexbox,
  color,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
  ColorProps,
} from 'styled-system'

const UL = styled.ul<LayoutProps & SpaceProps & FlexboxProps>`
  ${space}
  ${layout}
  ${flexbox}
  background-color: ${({ theme: { colors } }) => colors.layout.level0}; ;
`
const LI = styled.li<LayoutProps & SpaceProps & FlexboxProps & ColorProps>`
  ${space}
  ${layout}
  ${flexbox}
  ${color}

  &:focus {
    border: 1px solid red;
  }

  &:active {
    background-color: ${({ theme: { colors } }) => colors.layout.level0accent};
  }
`

const List = {
  UL,
  LI,
}

export default List
