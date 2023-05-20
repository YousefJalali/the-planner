import { useDeleteTask } from '@the-planner/data'
import { useRouter } from 'next/router'
import { Prompt } from '../ui'
import { useState } from 'react'

export default function DeleteTask({
  taskId,
  children,
}: {
  taskId: string
  children: (handler: () => void) => JSX.Element
}) {
  const [prompt, showPrompt] = useState(false)
  const router = useRouter()

  const { onDelete: deleteTaskHandler } = useDeleteTask(taskId)

  return (
    <>
      {children(() => showPrompt(true))}

      <Prompt
        id="task-delete"
        isOpen={prompt}
        dismiss={() => showPrompt(false)}
        title="Are you sure you want to delete this task?"
        message="Deleting the task will permanently remove it from your task list and cannot be undone. "
        action="delete"
        actionFn={() =>
          deleteTaskHandler(() => {
            //go back if task deleted from TaskDetails page
            if (router.query?.taskId) {
              router.back()
            }
          })
        }
      />
    </>
  )
}
