import styled, {
  BorderProps,
  BorderTopProps,
  HeightProps,
  LayoutProps,
  MarginProps,
  SpaceProps,
  SystemProp,
  Theme,
  WidthProps,
  x,
} from '@xstyled/styled-components'
import { FC } from 'react'

type Props = {
  trailColor?: string
  pathColor?: string
} & SystemProp<
  | SpaceProps
  | WidthProps
  | HeightProps
  | LayoutProps
  | MarginProps
  | BorderProps
  | BorderTopProps,
  Theme
>

export const Spinner: FC<Props> = (props) => {
  return (
    <x.div display="flex">
      <Spin
        w="1.5rem"
        h="1.5rem"
        border="4px solid"
        borderColor={props.trailColor || 'transparent'}
        borderTop="4px solid"
        borderTopColor={props.pathColor || 'layout-level0'}
        borderRadius="50%"
        {...props}
      />
    </x.div>
  )
}

const Spin = styled(x.div)`
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
