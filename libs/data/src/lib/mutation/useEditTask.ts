import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Task } from '@the-planner/types'
import { formatToUrlDate, getErrorMessage } from '@the-planner/utils'

import { editTask } from '../actions'
import { mutate } from 'swr'

export const useEditTask = ({ taskId }: { taskId: string }) => {
  const { trigger, error, isMutating } = useSWRMutation(
    ['/api/tasks', `?taskId=${taskId}`],
    (url, arg) => editTask(url, arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Task,
    callback?: (action?: any) => void
  ) => {
    //@ts-ignore
    trigger(formData, {
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
      message: 'task updated!',
      variant: 'success',
    })

    if (callback) {
      callback()
    }
  }

  return { onSubmit, error, isMutating }
}
