import { useUpdateTaskStatus } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { TaskWithProject } from '@the-planner/types'

export default function EditTaskStatus({
  taskId,
  children,
}: {
  taskId: string
  children: (handler: (task: TaskWithProject) => void) => JSX.Element
}) {
  const { clearModal } = useModal()
  const { onSubmit } = useUpdateTaskStatus({ taskId })

  return children((task) =>
    onSubmit(task, () => {
      //callback
      clearModal('task-options')
    })
  )
}
