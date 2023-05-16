import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Project } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { deleteProject } from '../actions'
import { mutate } from 'swr'

export const useDeleteProject = ({ projectId }: { projectId: string }) => {
  const { trigger, error, isMutating } = useSWRMutation(
    ['/api/projects', `?projectId=${projectId}`],
    (url, arg) => deleteProject(url, arg)
  )

  const { setNotification } = useNotification()

  const onDelete = async (
    formData: Project,
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
      onSuccess: () => {
        mutate('/api/projects')
      },
    })

    setNotification({
      message: `project '${formData.title}' is deleted!`,
      variant: 'success',
    })

    if (callback) {
      callback()
    }
  }

  return { onDelete, error, isMutating }
}
