import { useDeleteTask } from '@the-planner/data'
import { useRouter } from 'next/router'

export default function DeleteTask({
  taskId,
  children,
}: {
  taskId: string
  children: (handler: () => void) => JSX.Element
}) {
  const router = useRouter()

  const { onDelete: deleteTaskHandler } = useDeleteTask(taskId)

  return children(() =>
    deleteTaskHandler(() => {
      //go back if task deleted from TaskDetails page
      if (router.query?.taskId) {
        router.back()
      }
    })
  )
}
