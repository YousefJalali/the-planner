import { useUpdateTaskStatus } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { Task, TaskWithProject } from '@the-planner/types'

export default function EditTaskStatus({
  task,
  children,
}: {
  task: Task
  children: (handler: (task: TaskWithProject) => void) => JSX.Element
}) {
  const { clearModal } = useModal()
  const { onSubmit } = useUpdateTaskStatus({ task })

  return children((task) =>
    onSubmit(task, () => {
      //callback
      clearModal('task-options')
    })
  )
}
