import styled, { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
  percentage: number
  color: string
}

const Wrapper = styled.div<{ color: string }>`
  .CircularProgressbar-path {
    stroke: ${(p) => p.color};
  }

  .CircularProgressbar-trail {
    stroke: ${(p) => `${p.color}20`};
  }

  .CircularProgressbar-text {
    fill: content-contrast;
    font-size: 1.5rem;
  }
`

export const CircleProgress: FC<Props> = ({ color, percentage }) => {
  return (
    <Wrapper color={color}>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </Wrapper>
  )
}

export const LinearProgress: FC<Props> = ({ color, percentage }) => {
  return (
    <x.div w='100%'>
      <x.div display='flex' justifyContent='space-between'>
        <x.span text='body.small' color='content-subtle'>
          Progress
        </x.span>
        <x.span text='body.small' color='content-subtle'>
          {percentage}%
        </x.span>
      </x.div>

      <x.div w='100%' borderRadius={3} overflow='hidden' position='relative'>
        <x.div
          container
          w='calc(100vw + 4px - 48px)'
          h={8}
          backgroundImage='gradient-to-l'
          gradientFrom='transparent 4px'
          gradientTo={`${color}20 4px`}
          backgroundSize='20%'
        />

        <x.div
          position='absolute'
          h={8}
          top={0}
          left={0}
          w={`calc(${percentage}% + 4px)`}
          overflow='hidden'
        >
          <x.div
            container
            position='absolute'
            top={0}
            left={0}
            w='calc(100vw + 4px - 48px)'
            h={8}
            backgroundImage='gradient-to-l'
            gradientFrom='transparent 4px'
            gradientTo={`${color} 4px`}
            backgroundSize='20%'
          />
        </x.div>
      </x.div>
    </x.div>
  )
}
