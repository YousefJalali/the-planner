import styled from '@xstyled/styled-components'
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

const CircleProgress: FC<Props> = ({ color, percentage }) => {
  return (
    <Wrapper color={color}>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </Wrapper>
  )
}

export default CircleProgress
