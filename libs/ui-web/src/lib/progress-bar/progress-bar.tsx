import styled, { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

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
    <x.div w="100%">
      <x.div display="flex" justifyContent="space-between">
        <x.span text="body.small" color="content-subtle">
          Progress
        </x.span>
        <x.span text="body.small" color="content-subtle">
          {percentage}%
        </x.span>
      </x.div>

      <x.div
        w="100%"
        h={8}
        borderRadius={3}
        overflow="hidden"
        position="relative"
        backgroundColor={`${color}20`}
        zIndex={5}
      >
        {new Array(5)
          .fill(0)
          .map((ele, i) =>
            i === 4 || i === 0 ? null : (
              <x.div
                key={i}
                position="absolute"
                top={0}
                left={`${(100 * i) / 4}%`}
                h="100%"
                w={4}
                backgroundColor="layout-level0"
                zIndex={10}
              />
            )
          )}

        <x.div
          // borderRadius={4}
          backgroundColor={color}
          h="100%"
          w="100%"
          position="absolute"
          left="-100%"
          top={0}
          transform
          translateX={`${percentage}%`}
          transition
          transitionDuration={500}
        ></x.div>
      </x.div>
    </x.div>
  )
}
