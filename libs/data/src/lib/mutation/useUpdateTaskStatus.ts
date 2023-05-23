import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/router'

import { useNotification } from '@the-planner/hooks'
import { Task, TaskWithProject } from '@the-planner/types'
import {
  formatToUrlDate,
  getErrorMessage,
  statusAlias,
} from '@the-planner/utils'

import { changeTaskStatus } from '../actions'
import { mutate } from 'swr'

export const useUpdateTaskStatus = ({ task }: { task: Task }) => {
  const router = useRouter()

  const { trigger, error, isMutating } = useSWRMutation(
    [
      '/api/tasks',
      router.query?.projectId
        ? `?projectId=${router.query.projectId}`
        : `?d=${formatToUrlDate(task.startDate)}`,
    ],
    (url, arg) => changeTaskStatus([url.join(''), `?taskId=${task.id}`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: TaskWithProject,
    callback?: (action?: any) => void
  ) => {
    //@ts-ignore
    trigger(formData, {
      optimisticData: (data: any) => {
        if (data?.data) {
          return {
            data: data.data.map((task: TaskWithProject) =>
              task.id === formData.id ? { ...formData } : task
            ),
          }
        }
        return data
      },
      rollbackOnError: true,
      throwOnError: false,
      onError: (err) => {
        setNotification({
          message: getErrorMessage(err),
          variant: 'error',
        })
      },
      onSuccess: () => {
        mutate(['/api/projects', `?projectId=${formData.projectId}`])
      },
    })

    setNotification({
      message: `task moved to ${statusAlias(formData.status)}!`,
      variant: 'success',
    })

    if (callback) {
      callback()
    }
  }

  return { onSubmit, error, isMutating }
}
