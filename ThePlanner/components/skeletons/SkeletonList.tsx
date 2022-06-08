import { uniqueId } from 'lodash'
import { FC } from 'react'

type Props = {
  length: number
  component: JSX.Element
}

const SkeletonList: FC<Props> = ({ length, component }) => {
  return (
    <>
      {new Array(length).fill(0).map(() => (
        <li key={uniqueId()}>{component}</li>
      ))}
    </>
  )
}

export default SkeletonList
