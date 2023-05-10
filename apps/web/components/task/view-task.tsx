import { useModal } from '@the-planner/hooks'
import { TaskWithProject } from '@the-planner/types'
import { useCallback } from 'react'
import TaskDetails from './task-details'

export default function ViewTask({
  children,
  task,
  className,
}: {
  children: (showModal: () => void) => JSX.Element
  task: TaskWithProject
  className?: string
}) {
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

  return children(showModal)
}
