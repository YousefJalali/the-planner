import { useModal } from '@the-planner/hooks'
import { TaskWithProject } from '@the-planner/types'
import { useCallback } from 'react'
import { TaskDetails } from '../task/task-details'

export const useTaskDetailsModal = (task: TaskWithProject) => {
  const { setModal, clearModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-details',
        closeButton: true,
        content: (
          <TaskDetails task={task} onClose={() => clearModal('task-details')} />
        ),
      }),
    [task]
  )

  return { showModal }
}

export default useTaskDetailsModal
