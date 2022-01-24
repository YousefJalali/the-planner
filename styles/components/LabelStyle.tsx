import styled from 'styled-components'
import { color, ColorProps } from 'styled-system'

const Label = styled.label<ColorProps>`
  display: block;
  margin-bottom: ${({ theme }) => theme.space[0]}px;
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
  color: ${({ theme }) => theme.colors.content.default};
  &::first-letter {
    text-transform: uppercase;
  }
  ${color}
`

export default Label
