import { useModal } from '@the-planner/hooks'
import { TaskWithProjectType } from '@the-planner/types'
import { useCallback } from 'react'
import { TaskDetails } from '../task/task-details'

export const useTaskDetailsModal = (task: TaskWithProjectType) => {
  const { setModal, clearModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-details',
        content: (
          <TaskDetails task={task} onClose={() => clearModal('task-details')} />
        ),
      }),
    [task]
  )

  return { showModal }
}

export default useTaskDetailsModal
