import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { formatToUrlDate, getErrorMessage } from '@the-planner/utils'

import { deleteTask } from '../actions'
import { mutate } from 'swr'

export const useDeleteTask = (taskId: string) => {
  const { trigger, error, isMutating } = useSWRMutation(
    ['/api/tasks', `?taskId=${taskId}`],
    (url, arg) => deleteTask(url, arg)
  )

  const { setNotification } = useNotification()

  const onDelete = async (callback?: (action?: any) => void) => {
    //@ts-ignore
    trigger(taskId, {
      optimisticData: (data: any) => {
        // console.log(data)
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
      onSuccess: (data, key) => {
        if (data?.data) {
          mutate(['/api/tasks', `?projectId=${data.data?.projectId}`])
          mutate(['/api/tasks', `?d=${formatToUrlDate(data.data?.startDate)}`])
          mutate(['/api/projects', `?limit=10`])
        }
      },
    })
    setNotification({
      message: `task deleted!`,
      variant: 'success',
    })

    if (callback) {
      callback()
    }
  }

  return { onDelete, error, isMutating }
}
