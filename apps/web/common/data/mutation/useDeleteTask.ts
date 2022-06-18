import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { deleteTask } from '../../actions'
import { useNotification } from '../../contexts/NotificationCtx'
import { usePrompt } from '../../contexts/PromptCtx'
import useDateTasks from '../../data/query/useDateTasks'
import { useProject, useTask } from '../../data/query'
import { getErrorMessage } from '@the-planner/utils'

export const useDeleteTask = (callback?: (action?: any) => void) => {
  const [isReSubmitting, setReSubmit] = useState(false)

  const { setNotification } = useNotification()

  const { setPrompt } = usePrompt()

  const router = useRouter()
  const { d: date, projectId, taskId } = router.query

  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date as string)
  const { mutate: mutateProject, project } = useProject(projectId as string)
  const { mutate: mutateTask, task } = useTask(taskId as string)

  const confirmBeforeDeleteHandler = (taskId: string) => {
    setPrompt({
      id: 'delete-task',
      title: 'are you sure?',
      message: "you can't undo this",
      action: 'delete',
      actionFn: () => deleteHandler(taskId),
    })
  }

  const deleteHandler = async (taskId: string) => {
    const request = async () => {
      try {
        const { data: deletedTask } = await deleteTask(taskId)

        if (!deletedTask) throw new Error('Something went wrong!')

        setNotification({
          id: uniqueId(),
          message: 'task deleted!',
          variant: 'confirmation',
        })

        return deletedTask
      } catch (error) {
        setNotification({
          id: uniqueId(),
          message: getErrorMessage(error),
          variant: 'critical',
          action: 'try again',
          actionFn: async () => {
            setReSubmit(true)

            setNotification({
              id: uniqueId(),
              message: 'deleting...',
              variant: 'critical',
              loading: isReSubmitting,
            })

            await request()

            mutateDateTasks()
            mutateProject()

            setReSubmit(false)
          },
        })
      }
    }

    // in date tasks
    if (date) {
      const updatedTasks = {
        data: dateTasks.filter((t) => t.id !== taskId),
      }

      mutateDateTasks(
        async () => {
          const deletedTask = await request()

          return {
            data: deletedTask
              ? dateTasks.filter((t) => t.id !== deletedTask.id)
              : dateTasks,
          }
        },
        {
          optimisticData: updatedTasks,
          rollbackOnError: true,
        }
      )
    }

    // in project details
    if (projectId) {
      const updatedProject = {
        data: {
          ...project,
          tasks: project.tasks.filter((t) => t.id !== taskId),
          _count: {
            tasks: project._count.tasks - 1,
          },
        },
      }

      mutateProject(
        async () => {
          const deletedTask = await request()
          return {
            data: {
              ...project,
              tasks: project.tasks.filter((t) => t.id !== deletedTask.id),
              _count: {
                tasks: project._count.tasks - 1,
              },
            },
          }
        },
        {
          optimisticData: updatedProject,
          rollbackOnError: true,
        }
      )
    }

    // in task details
    if (taskId) {
      const updatedTask = null

      mutateTask(
        async () => {
          const deletedTask = await request()

          router.back()

          return {
            data: null,
          }
        },
        {
          optimisticData: updatedTask,
          rollbackOnError: true,
        }
      )
    }

    if (callback) {
      callback()
    }
  }

  return { deleteTaskHandler: confirmBeforeDeleteHandler }
}

export default useDeleteTask
