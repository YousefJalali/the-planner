import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Task } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { createTask } from '../actions'

export const useCreateTask = ({
  projectId,
  date,
}: {
  projectId?: string
  date?: string
}) => {
  const { trigger, error, isMutating } = useSWRMutation(
    [
      '/api/tasks',
      projectId ? `?projectId=${projectId}` : date ? `?d=${date}` : '',
    ],
    (url, arg) => createTask(url, arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Task,
    callback?: (action?: any) => void
  ) => {
    //@ts-ignore
    trigger(formData, {
      //@ts-ignore
      optimisticData: (data: any) =>
        data?.data ? { data: [formData, ...data.data] } : data,
      rollbackOnError: true,
      throwOnError: false,
      onError: (err) => {
        setNotification({
          message: getErrorMessage(err),
          variant: 'error',
        })
      },
      onSuccess: () => {},
    })

    setNotification({
      message: `task '${formData.title}' created!`,
      variant: 'success',
    })

    if (callback) {
      callback()
    }
  }

  return { onSubmit, error, isMutating }
}
