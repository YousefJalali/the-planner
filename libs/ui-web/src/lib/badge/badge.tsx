import { x } from '@xstyled/styled-components'
import { FC } from 'react'

type Props = {
  children: string
  color: string
  textOnly?: boolean
  count?: number
}

export const Badge: FC<Props> = ({ children, color, textOnly, count }) => {
  return textOnly ? (
    <x.span display="block" color={color} textTransform="capitalize">
      • {children}
    </x.span>
  ) : (
    <x.div
      backgroundColor={`${color}-a20`}
      borderRadius={1}
      w="fit-content"
      h="fit-content"
      display="flex"
      alignItems="center"
      p={1}
    >
      <x.span
        color={color}
        p={count ? 1 : 0}
        fontSize="xs"
        lineHeight="none"
        letterSpacing={1}
      >
        {children.toUpperCase()}
      </x.span>

      {count && count > 0 ? (
        <x.div
          backgroundColor={color}
          borderRadius="full"
          h={14}
          w={14}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <x.span fontSize="50%" color="layout-level0" lineHeight="none">
            {+count}
          </x.span>
        </x.div>
      ) : null}
    </x.div>
  )
}

export default Badge
