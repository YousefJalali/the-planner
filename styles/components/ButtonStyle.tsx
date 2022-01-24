import styled from 'styled-components'
import { space, variant, SpaceProps, ColorProps } from 'styled-system'

interface ButtonProps extends SpaceProps, ColorProps {
  variant: 'primary' | 'secondary' | 'textOnly'
}

const BaseButton = styled.button`
  border: 0;
  width: 100%;
  padding: ${({ theme: { space } }) => `${space[1]}px 0`};
  text-transform: capitalize;
  border-radius: ${({ theme: { radii } }) => radii[3]}px;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    height: ${({ theme: { fontSizes } }) => fontSizes[4]}px;
    width: ${({ theme: { fontSizes } }) => fontSizes[4]}px;
    margin-right: ${({ theme: { space } }) => space[0]}px;
  }
`

const Button = styled(BaseButton)<ButtonProps>(
  variant({
    prop: 'variant',
    variants: {
      primary: {
        backgroundColor: 'brand.primary',
        color: 'layout.level0',
      },
      secondary: {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderColor: 'brand.primary',
        color: 'brand.primary',
      },
      three: {
        backgroundColor: 'brand.tertiary',
      },
    },
  }),
  space
)

export default Button
