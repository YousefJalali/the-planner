import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { editTask } from '../actions'
import { useNotification } from '@the-planner/hooks'
import useDateTasks from '../query/useDateTasks'
import { useProject, useTask } from '../query'
import { TaskType } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

export const useEditTask = (
  showForm: (defValues?: Partial<TaskType>, serverErrors?: object) => void,
  callback: (action?: any) => void
) => {
  const { setNotification } = useNotification()

  const router = useRouter()
  const { d: date, projectId, taskId } = router.query

  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date as string)
  const { mutate: mutateProject, project } = useProject(projectId as string)
  const { mutate: mutateTask, task } = useTask(taskId as string)

  const onSubmit = async (formData: TaskType) => {
    const request = async () => {
      try {
        const {
          data: updatedTask,
          error,
          validationErrors,
        } = await editTask(formData)

        if (validationErrors) {
          showForm(formData, validationErrors)
          return null
        }

        if (error) {
          throw new Error(error)
        }

        setNotification({
          id: uniqueId(),
          message: 'task updated!',
          variant: 'confirmation',
        })

        return updatedTask
      } catch (error) {
        setNotification({
          id: uniqueId(),
          message: getErrorMessage(error),
          variant: 'critical',
          action: 'try again',
          actionFn: () => showForm(formData),
        })
      }
    }

    // in date tasks
    if (date) {
      const updateTasks = (updatedTask = formData) => {
        return {
          data: dateTasks.reduce((updatedTasks: TaskType[], task) => {
            if (task.id === updatedTask.id) {
              if (
                new Date(task.startDate).getTime() ===
                new Date(updatedTask.startDate).getTime()
              ) {
                updatedTasks.push(updatedTask)
              }
            } else {
              updatedTasks.push(task)
            }
            return updatedTasks
          }, []),
        }
      }

      console.log(updateTasks())

      mutateDateTasks(
        async () => {
          const updatedTask = await request()

          if (!updatedTask) {
            return { data: dateTasks }
          }

          return updateTasks(updatedTask)
        },
        {
          optimisticData: updateTasks(),
          rollbackOnError: true,
        }
      )
    }

    // in project details
    if (projectId) {
      const updateProject = (updatedTask = formData) => {
        let updatedProject = {}

        if (updatedTask.projectId === projectId) {
          updatedProject = {
            data: {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            },
          }
        } else {
          updatedProject = {
            data: {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== updatedTask.id),
            },
          }
        }

        return updatedProject
      }

      mutateProject(
        async () => {
          const updatedTask = await request()

          if (!updatedTask) {
            return {
              data: project,
            }
          }

          return updateProject(updatedTask)
        },
        {
          optimisticData: updateProject(),
          rollbackOnError: true,
        }
      )
    }

    if (task) {
      mutateTask(
        async () => {
          const updatedTask = await request()

          return {
            data: updatedTask,
          }
        },
        {
          optimisticData: { data: formData },
          rollbackOnError: true,
        }
      )
    }

    callback()
  }

  return { onSubmit }
}

export default useEditTask
