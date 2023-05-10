import { useDeleteTask } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'

export default function DeleteTask({
  children,
}: {
  children: (handler: (taskId: string) => void) => JSX.Element
}) {
  const { clearModal } = useModal()
  const { deleteTaskHandler } = useDeleteTask(() => clearModal('task-options'))

  return children((taskId: string) => deleteTaskHandler(taskId))
}
