import { x } from '@xstyled/styled-components'
import { FC } from 'react'

type Props = {
  variant: 'proposed' | 'in progress' | 'inprogress' | 'completed'
}
const Tag: FC<Props> = ({ variant }) => {
  if (variant === 'inprogress') {
    variant = 'in progress'
  }
  const v = `tag-${variant.replace(' ', '')}`

  return (
    <x.div backgroundColor={`${v}-bg`} borderRadius={1} w='fit-content'>
      <x.span
        color={`${v}-color`}
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
