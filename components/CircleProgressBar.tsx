import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.figure`
  height: 56px;
  width: 56px;
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
  fill: ${(props) => props.theme.colors.content.contrast};
  font-family: 'DM Sans';
`

const INITIAL_OFFSET = 25
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954',
}

type Props = {
  trailStrokeColor: string
  strokeColor: string
  percentage: number
  innerText: string
}

const CircleProgressBar: FC<Props> = ({
  trailStrokeColor,
  strokeColor,
  percentage,
  innerText,
}) => {
  return (
    <Container>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill='transparent'
          stroke='transparent'
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
