import { uniqueId } from 'lodash'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'

import useDateTasks from '../../data/useDateTasks'
import useProject from '../../data/useProject'
import { Status } from '../../types/TaskType'
import getErrorMessage from '../../utils/getErrorMessage'

const useUpdateTaskStatus = (
  projectId: string | null,
  date: string | null,
  callback?: (action?: any) => void
) => {
  const { setNotification } = useNotification()

  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date)
  const { mutate: mutateProject, project } = useProject(projectId)

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

    if (callback) {
      callback()
    }
  }

  return { taskStatusHandler }
}

export default useUpdateTaskStatus
