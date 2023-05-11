import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Project, ProjectWithTasksAndCount } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { createProject } from '../actions'

export const useCreateProject = () => {
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
      optimisticData: (data: any) => ({
        ...data,
        data: [
          {
            ...formData,
            tasks: [],
            _count: { tasks: 0 },
          },
          ...data.data,
        ],
      }),
      rollbackOnError: true,
      throwOnError: false,
      onError: (err) => {
        setNotification({
          message: getErrorMessage(err),
          variant: 'error',
        })
      },
      onSuccess: () => {
        setNotification({
          message: 'project created!',
          variant: 'success',
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, error, isMutating }

  // const { setNotification } = useNotification()

  // const router = useRouter()
  // const { pathname } = router

  // const { mutate: mutateInfiniteProjects, projects: infiniteProjects } =
  //   useInfiniteProjects()
  // const { mutate: mutateProjects, projects } = useProjects({})

  // const onSubmit = async (formData: Project) => {
  //   const projectFormData = {
  //     ...formData,
  //     id: ObjectID().toHexString(),
  //   }

  //   const request = async () => {
  //     try {
  //       const {
  //         data: createdProject,
  //         error,
  //         validationErrors,
  //       } = await createProject(projectFormData)

  //       // if (validationErrors) {
  //       //   showForm(projectFormData, validationErrors)
  //       //   return null
  //       // }

  //       if (error) {
  //         throw new Error(error)
  //       }

  //       setNotification({
  //         id: uniqueId(),
  //         message: 'project created!',
  //         variant: 'success',
  //       })

  //       return createdProject as ProjectWithTasksAndCount
  //     } catch (error) {
  //       setNotification({
  //         id: uniqueId(),
  //         message: getErrorMessage(error),
  //         variant: 'error',
  //         // action: 'try again',
  //         // actionFn: () => showForm(projectFormData),
  //       })
  //     }
  //   }

  //   if (pathname === '/projects') {
  //     await request()
  //     mutateInfiniteProjects()
  //   } else {
  //     const updatedProjects = {
  //       data: [{ ...projectFormData }, ...projects],
  //     }

  //     mutateProjects(
  //       async () => {
  //         const createdProject = await request()

  //         return {
  //           data: createdProject ? [createdProject, ...projects] : projects,
  //         }
  //       },
  //       {
  //         optimisticData: updatedProjects,
  //         rollbackOnError: true,
  //       }
  //     )
  //   }

  //   if (callback) {
  //     callback()
  //   }
  // }

  // return { onSubmit }
}
