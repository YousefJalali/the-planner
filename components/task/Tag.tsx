import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status } from '../../common/types/TaskType'

type Props = {
  variant: Status
}
const Tag: FC<Props> = ({ variant }) => {
  const v = `tag-${variant.replace(' ', '')}`

  return (
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
