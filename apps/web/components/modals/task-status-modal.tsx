import { useModal } from '@the-planner/hooks'
import { Status } from '@the-planner/types'
import { useCallback } from 'react'
import StatusList from '../task/task-options/task-options-list/change-status-option/status-list'

export const useTaskStatusModal = (taskId: string, status: Status) => {
  const { setModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-status',
        content: <StatusList taskId={taskId} status={status} />,
      }),
    [taskId, status]
  )

  return { showModal }
}

export default useTaskStatusModal
