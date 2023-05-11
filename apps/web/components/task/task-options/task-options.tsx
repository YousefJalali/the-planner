import { FC, useCallback } from 'react'
import { TaskWithProject } from '@the-planner/types'
import { FiMoreVertical } from 'react-icons/fi'
import { useMedia, useModal } from '@the-planner/hooks'
import { Dropdown } from '../../ui'
import TaskOptionsList from './task-options-list'

type Props = {
  task: TaskWithProject
  inHeader?: boolean
}

export const TaskOptions: FC<Props> = ({ task, inHeader }) => {
  const isMobile = useMedia('(max-width: 768px)')

  const { setModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-options',
        content: <TaskOptionsList task={task} />,
        closesWhenClickedOutside: true,
      }),
    [task]
  )

  return !isMobile ? (
    <Dropdown
      className="btn btn-circle btn-sm btn-ghost"
      btnComp={<FiMoreVertical size={inHeader ? 24 : 18} />}
    >
      <TaskOptionsList task={task} />
    </Dropdown>
  ) : (
    <button
      data-testid="taskItem-kebab"
      name="task options"
      onClick={showModal}
      className={`btn btn-circle btn-sm btn-ghost ${inHeader ? '-mr-3' : ''}`}
    >
      <FiMoreVertical size={inHeader ? 24 : 18} />
    </button>
  )
}

export default TaskOptions
