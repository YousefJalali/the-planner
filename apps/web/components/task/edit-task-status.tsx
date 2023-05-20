import { useUpdateTaskStatus } from '@the-planner/data'
import { Task, TaskWithProject } from '@the-planner/types'

export default function EditTaskStatus({
  task,
  children,
}: {
  task: Task
  children: (handler: (task: TaskWithProject) => void) => JSX.Element
}) {
  const { onSubmit } = useUpdateTaskStatus({ task })

  return children((task) => onSubmit(task))
}
