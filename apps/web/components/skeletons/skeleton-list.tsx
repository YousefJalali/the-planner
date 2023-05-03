import { ScrollableList } from '@the-planner/ui-web'
import { uniqueId } from 'lodash'
import { FC } from 'react'

type Props = {
  component: JSX.Element
  length?: number
  direction?: 'horizontal' | 'vertical'
}

const Item = ({
  children,
  length = 5,
}: {
  children: JSX.Element
  length?: number
}) => (
  <>
    {new Array(length).fill(0).map(() => (
      <li key={uniqueId()}>{children}</li>
    ))}
  </>
)

export const SkeletonList: FC<Props> = ({
  length,
  component,
  direction = 'vertical',
}) => {
  return direction === 'horizontal' ? (
    <ScrollableList spaceX={4}>
      <Item length={length}>{component}</Item>
    </ScrollableList>
  ) : (
    <ul className="space-y-6">
      <Item length={length}>{component}</Item>
    </ul>
  )
}

export default SkeletonList
