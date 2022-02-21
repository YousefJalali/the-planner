import { FC } from 'react'
import { x } from '@xstyled/styled-components'

type Props = {
  tasks: JSX.Element[]
  title?: string
  titleColor?: string
}
const TasksList: FC<Props> = ({ tasks, title, titleColor }) => {
  return (
    <>
      <x.span
        display='block'
        px={4}
        mb={2}
        color={titleColor || 'content.subtle'}
      >
        • {title}
      </x.span>
      <x.ul px={4} pb={4} spaceY={3}>
        {tasks}
      </x.ul>
    </>
  )
}

export default TasksList
