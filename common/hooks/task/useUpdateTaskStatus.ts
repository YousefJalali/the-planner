import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'

import useDateTasks from '../../data/useDateTasks'
import useProject from '../../data/useProject'
import useTask from '../../data/useTask'
import { Status } from '../../types/TaskType'
import getErrorMessage from '../../utils/getErrorMessage'

const useUpdateTaskStatus = (callback?: (action?: any) => void) => {
  const { setNotification } = useNotification()

  const router = useRouter()
  const { d: date, projectId, taskId } = router.query

  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date as string)
  const { mutate: mutateProject, project } = useProject(projectId as string)
  const { mutate: mutateTask, task } = useTask(taskId as string)

  const taskStatusHandler = async ({
    taskId,
    newStatus,
  }: {
    taskId: string
    newStatus: Status
  }) => {
    const request = async () => {
      try {
        return await changeTaskStatus(taskId, newStatus)
      } catch (error) {
        setNotification({
          id: uniqueId(),
          message: getErrorMessage(error),
          variant: 'critical',
        })
      }
    }

    // in date tasks
    if (date) {
      const updatedTasks = {
        data: dateTasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        ),
      }

      mutateDateTasks(
        async () => {
          const updatedTask = await request()
          return {
            data: dateTasks.map((t) =>
              t.id === updatedTask.data.id ? updatedTask.data : t
            ),
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
          tasks: project.tasks.map((t) =>
            t.id === taskId ? { ...t, status: newStatus } : t
          ),
        },
      }

      mutateProject(
        async () => {
          const updatedTask = await request()
          return {
            data: {
              ...project,
              tasks: project.tasks.map((t) =>
                t.id === updatedTask.data.id ? updatedTask.data : t
              ),
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
      const updatedTask = {
        data: {
          ...task,
          status: newStatus,
        },
      }

      mutateTask(
        async () => {
          const req = await request()
          return {
            data: {
              ...task,
              status: req.data.status,
            },
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

  return { taskStatusHandler }
}

export default useUpdateTaskStatus
