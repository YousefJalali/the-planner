import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Project } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { editProject } from '../actions'

export const useEditProject = ({ projectId }: { projectId: string }) => {
  const { trigger, error, isMutating } = useSWRMutation(
    ['/api/projects', `?projectId=${projectId}`],
    (url, arg) => editProject(url, arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Project,
    callback?: (action?: any) => void
  ) => {
    //@ts-ignore
    trigger(formData, {
      optimisticData: (data: any) => ({ data: { ...formData } }),
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
      message: 'project updated!',
      variant: 'success',
    })

    if (callback) {
      callback()
    }
  }

  return { onSubmit, error, isMutating }
}
