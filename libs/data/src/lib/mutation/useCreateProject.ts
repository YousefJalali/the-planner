import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Project } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { createProject } from '../actions'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { useInfiniteProjects } from '../query'

export const useCreateProject = () => {
  const router = useRouter()
  const { mutate: mutateInfiniteProjects } = useInfiniteProjects()
  const { trigger, error, isMutating } = useSWRMutation(
    '/api/projects',
    (url, arg) => createProject(url, arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Project,
    callback?: (action?: any) => void
  ) => {
    //@ts-ignore
    trigger(formData, {
      //@ts-ignore
      optimisticData: (data: any) => {
        return data?.data
          ? {
              ...data,
              data: [
                {
                  ...formData,
                  tasks: [],
                  _count: { tasks: 0 },
                },
                ...data.data,
              ],
            }
          : data
      },
      rollbackOnError: true,
      throwOnError: false,
      onError: (err) => {
        setNotification({
          message: getErrorMessage(err),
          variant: 'error',
        })
      },
      onSuccess: (data) => {
        mutateInfiniteProjects()
        mutate(['/api/projects', '?']) //project list
        mutate(['/api/projects', '?limit=5']) //featured projects
      },
    })

    setNotification({
      message: `Project '${formData.title}' created!`,
      variant: 'success',
      action: 'view',
      actionFn: () => router.push(`/projects/${formData.id}`),
    })

    if (callback) {
      callback()
    }
  }

  return { onSubmit, error, isMutating }
}
