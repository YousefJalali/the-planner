import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { UseFormSetError } from 'react-hook-form'
import { createTask as createTaskHandler } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { TaskType } from '../../types/TaskType'
import { DATE_FORMAT } from '../../constants'
import { parse } from 'date-fns'
import useDateTasks from '../../data/useDateTasks'
import useProject from '../../data/useProject'
import getErrorMessage from '../../utils/getErrorMessage'

const useCreateTask = (
  showForm: (defValues?: Partial<TaskType>, serverErrors?: object) => void,
  callback: (action?: any) => void
) => {
  const { setNotification } = useNotification()

  const router = useRouter()
  const { d: date, projectId } = router.query

  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date as string)
  const { mutate: mutateProject, project } = useProject(projectId as string)

  let defaultValues: Partial<TaskType> = {}

  if (projectId) {
    defaultValues = {
      ...defaultValues,
      projectId: projectId as string,
    }
  }
  if (date) {
    defaultValues = {
      ...defaultValues,
      startDate: parse(date as string, DATE_FORMAT, new Date()),
    }
  }

  const onSubmit = async (
    formData: TaskType,
    setError: UseFormSetError<TaskType>
  ) => {
    const request = async () => {
      try {
        const {
          data: createdTask,
          error,
          validationErrors,
        } = await createTaskHandler(formData)

        if (validationErrors) {
          showForm(formData, validationErrors)
          return null
        }

        if (error) {
          throw new Error(error)
        }

        return createdTask
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
      const updatedTasks = {
        data: [
          {
            ...formData,
            project: {
              title: 'local',
              color: '#000000',
            },
          },
          ...dateTasks,
        ],
      }

      mutateDateTasks(
        async () => {
          const createdTask = await request()

          return {
            data: createdTask ? [createdTask, ...dateTasks] : dateTasks,
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
          tasks: [
            {
              ...formData,
              project: {
                title: project.title,
                color: project.color,
              },
            },
            ...project.tasks,
          ],
          _count: {
            tasks: project._count.tasks + 1,
          },
        },
      }

      mutateProject(
        async () => {
          const createdTask = await request()

          return {
            data: createdTask
              ? {
                  ...project,
                  tasks: [createdTask, ...project.tasks],
                  _count: {
                    tasks: project._count.tasks + 1,
                  },
                }
              : project,
          }
        },
        {
          optimisticData: updatedProject,
          rollbackOnError: true,
        }
      )
    }

    callback()
  }

  return { onSubmit, defaultValues }
}

export default useCreateTask
