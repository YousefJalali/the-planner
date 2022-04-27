import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status } from '../../common/types/TaskType'

type Props = {
  variant: Status
  textOnly?: boolean
}
const Tag: FC<Props> = ({ variant, textOnly }) => {
  const v = `tag-${variant.replace(' ', '')}`

  return textOnly ? (
    <x.span
      display='block'
      mb={2}
      color={`tag-${variant}`}
      textTransform='capitalize'
    >
      • {variant}
    </x.span>
  ) : (
    <x.div backgroundColor={`${v}-a20`} borderRadius={1} w='fit-content'>
      <x.span
        color={`${v}`}
        p={1}
        fontSize='xs'
        lineHeight='none'
        letterSpacing={1}
      >
        {variant.toUpperCase()}
      </x.span>
    </x.div>
  )
}

export default Tag
