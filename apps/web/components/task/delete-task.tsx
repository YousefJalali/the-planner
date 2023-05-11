import { useDeleteTask } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { useRouter } from 'next/router'

export default function DeleteTask({
  taskId,
  children,
}: {
  taskId: string
  children: (handler: () => void) => JSX.Element
}) {
  const router = useRouter()

  const { clearModal } = useModal()
  const { onDelete: deleteTaskHandler } = useDeleteTask(taskId)

  return children(() =>
    deleteTaskHandler(() => {
      //callback
      clearModal('task-options')

      //go back if task deleted from TaskDetails page
      if (router.query?.taskId) {
        router.back()
      }
    })
  )
}
