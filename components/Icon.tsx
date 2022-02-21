import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiXOctagon } from 'react-icons/fi'

type Props = {
  icon: (props: IconBaseProps) => JSX.Element
  color?: string
  size?: string
}

const Icon: FC<Props> = ({
  icon,
  color = 'content-contrast',
  size = '1rem',
}) => {
  return typeof icon === 'function' ? (
    <x.svg
      {...icon({}).props.attr}
      xmlns='http://www.w3.org/2000/svg'
      color={color}
      h={size}
      w={size}
    >
      {icon({}).props.children}
    </x.svg>
  ) : (
    <FiXOctagon />
  )
}

export default Icon
