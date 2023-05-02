import { useModal } from '@the-planner/hooks'
import { TaskWithProject } from '@the-planner/types'
import { useCallback } from 'react'
import { TaskOptionsList } from '../task/task-options/task-options-list'

export const useTaskOptionsModal = (task: TaskWithProject) => {
  const { setModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-options',
        content: <TaskOptionsList task={task} />,
      }),
    [task]
  )

  return { showModal }
}

export default useTaskOptionsModal
