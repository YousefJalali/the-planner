import { useState } from 'react'
import { omit } from 'lodash'
import { useRouter } from 'next/router'
import ObjectID from 'bson-objectid'
import { parse } from 'date-fns'

import { useNotification } from '@the-planner/hooks'
import { TaskType, TaskWithProjectType } from '@the-planner/types'
import { getErrorMessage, URL_DATE_FORMAT } from '@the-planner/utils'

import useDateTasks from '../query/useDateTasks'
import { useProject } from '../query'
import { createTask as createTaskHandler } from '../actions'

export const useCreateTask = (
  date: string,
  showForm: (defValues?: Partial<TaskType>, serverErrors?: object) => void,
  callback: (action?: any) => void
) => {
  const [status, setStatus] = useState()

  const { setNotification } = useNotification()

  const router = useRouter()
  const { projectId } = router.query

  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date as string)
  const { mutate: mutateProject, project } = useProject(projectId as string)

  let defaultValues: Partial<TaskType> = {
    id: ObjectID().toHexString(),
  }

  if (projectId) {
    defaultValues = {
      ...defaultValues,
      projectId: projectId as string,
    }
  }
  // if (date) {
  //   defaultValues = {
  //     ...defaultValues,
  //     startDate: parse(date as string, URL_DATE_FORMAT, new Date()),
  //   }
  // }

  const onSubmit = async (formData: TaskType | TaskWithProjectType) => {
    const request = async () => {
      try {
        const {
          data: createdTask,
          error,
          validationErrors,
        } = await createTaskHandler(omit(formData, 'project'))

        if (validationErrors) {
          showForm(formData, validationErrors)
          return null
        }

        if (error) {
          throw new Error(error)
        }

        setNotification({
          message: 'task created!',
          variant: 'confirmation',
        })

        return createdTask
      } catch (error) {
        setNotification({
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
        data: [formData, ...dateTasks],
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
