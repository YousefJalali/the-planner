import { FC } from 'react'
import styled from '@xstyled/styled-components'

type Props = {
  strokeColor: string
  percentage: number
}

const Container = styled.figure`
  height: 100%;
  width: 100%;
  margin: 0;
`

const Label = styled.g`
  transform: translateY(0.6em);
`
const Percentage = styled.text`
  font-size: 0.6em;
  line-height: 1;
  text-anchor: middle;
  transform: translateY(-0.6em);
  fill: content-contrast;
  font-family: 'DM Sans';
`

const INITIAL_OFFSET = 25
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954',
}

const CircleProgressBar: FC<Props> = ({ strokeColor, percentage }) => {
  return (
    <Container>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill='transparent'
          stroke={`${strokeColor}20`}
          strokeWidth={2}
        />

        <circle
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill='transparent'
          stroke={strokeColor}
          strokeDasharray={`${percentage} ${100 - percentage}`}
          strokeDashoffset={INITIAL_OFFSET}
          strokeWidth={2}
        />
        <Label>
          <Percentage x='50%' y='50%'>
            {percentage}%
          </Percentage>
        </Label>
      </svg>
    </Container>
  )
}

export default CircleProgressBar
