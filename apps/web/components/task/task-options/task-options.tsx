import { FC, useMemo } from 'react'
import { TaskWithProject } from '@the-planner/types'
import TaskOptionsButton from './task-option-button'
import { useTaskOptionsModal } from '../../modals'

type Props = {
  task: TaskWithProject
  inHeader?: boolean
}

export const TaskOptions: FC<Props> = ({ task, inHeader }) => {
  const { showModal } = useTaskOptionsModal(task)

  return useMemo(
    () => <TaskOptionsButton onClick={showModal} inHeader={inHeader} />,
    [showModal, inHeader]
  )
}

export default TaskOptions
