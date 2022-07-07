import { x } from '@xstyled/styled-components'
import { FC, InputHTMLAttributes } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

type Props = {
  height?: number
  darkMode?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const ToggleButton: FC<Props> = ({
  height = 31,
  darkMode = false,
  ...props
}) => {
  const ratio = 31 / 51
  const h = height
  const w = Math.floor(h / ratio)
  const ball = h - 4
  const movement = ball * 2 - w

  return (
    <x.label
      htmlFor={props.id}
      data-testid={props.id}
      position="relative"
      h={h}
      w={w}
      backgroundColor="layout-level2accent"
      borderRadius={100}
      overflow="hidden"
    >
      {/* background */}
      <x.span
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        backgroundColor="brand-primary"
        opacity={props.checked ? 1 : 0}
        transition="all .4s"
        borderRadius={100}
      />

      {/* ball */}
      <x.span
        position="absolute"
        top={`${(h - ball) / 2}px`}
        left={`${movement}px`}
        h={ball}
        w={ball}
        backgroundColor="layout-level0"
        borderRadius="full"
        transform
        rotate={`${ball / (ball - movement * 3)}rad`}
        translateX={props.checked && ball - movement * 3}
        transition="all .4s"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize={`${ball - 6}px`}
      >
        {darkMode && (
          <x.span position="relative">
            <FiSun />
            <x.span
              position="absolute"
              top={0}
              left={0}
              opacity={props.checked ? 1 : 0}
              backgroundColor="layout-level0"
              color="content-contrast"
              borderRadius="full"
              transition="all .4s"
              transform
              rotate={`${-ball / (ball - movement * 3)}rad`}
            >
              <FiMoon />
            </x.span>
          </x.span>
        )}
      </x.span>

      <x.input
        {...props}
        type="checkbox"
        h={0}
        w={0}
        m={0}
        visibility="hidden"
      />
    </x.label>
  )
}

export default ToggleButton
