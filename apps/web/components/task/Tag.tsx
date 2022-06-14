import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'

type Props = {
  variant: Status
  textOnly?: boolean
  count?: number | string
}
const Tag: FC<Props> = ({ variant, textOnly, count }) => {
  return textOnly ? (
    <x.span display="block" color={`tag-${variant}`} textTransform="capitalize">
      • {statusAlias(variant)}
    </x.span>
  ) : (
    <x.div
      backgroundColor={`tag-${variant}-a20`}
      borderRadius={1}
      w="fit-content"
      h="fit-content"
      display="flex"
      alignItems="center"
      p={1}
    >
      <x.span
        color={`tag-${variant}`}
        p={count ? 1 : 0}
        fontSize="xs"
        lineHeight="none"
        letterSpacing={1}
      >
        {statusAlias(variant).toUpperCase()}
      </x.span>

      {count && (
        <x.div
          backgroundColor={`tag-${variant}`}
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
      )}
    </x.div>
  )
}

export default Tag
