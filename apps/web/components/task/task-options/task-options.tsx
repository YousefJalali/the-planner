import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { TaskWithProjectType } from '@the-planner/types'
import { TaskOptionsList } from './task-options-list'
import TaskOptionsButton from './task-option-button'

type Props = {
  task: TaskWithProjectType
  inHeader?: boolean
}

export const TaskOptions: FC<Props> = ({ task, inHeader }) => {
  const { setModal } = useModal()

  const onOptions = () => {
    setModal({
      id: 'task-options',
      content: <TaskOptionsList task={task} />,
    })
  }

  return <TaskOptionsButton onClick={onOptions} inHeader={inHeader} />
}

export default TaskOptions
