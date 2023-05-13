import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { Project, ProjectWithTasksAndCount } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { editProject } from '../actions'

export const useDeleteProject = ({ projectId }: { projectId: string }) => {
  const { trigger, error, isMutating } = useSWRMutation(
    '/api/projects',
    (url, arg) =>
      editProject([url, `?${new URLSearchParams(projectId).toString()}`], arg)
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
        setNotification({
          message: 'project deleted!',
          variant: 'success',
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onDelete, error, isMutating }
}

// import { uniqueId } from 'lodash'
// import { useState } from 'react'
// import { useSWRConfig } from 'swr'
// import { deleteProject } from '../actions'
// import { useNotification } from '@the-planner/hooks'
// import { usePrompt } from '@the-planner/hooks'
// import { projectsKey } from '../keys'
// import { Project, ProjectWithTasks } from '@the-planner/types'

// export const useDeleteProject = (callback?: (action?: any) => void) => {
//   const [isReSubmitting, setReSubmit] = useState(false)

//   const { setNotification } = useNotification()

//   const { setPrompt } = usePrompt()

//   const { mutate } = useSWRConfig()

//   const confirmBeforeDeleteHandler = (project: ProjectWithTasks | Project) => {
//     setPrompt({
//       id: 'delete-project',
//       title: 'are you sure?',
//       message:
//         "all tasks under this projects will be deleted too, you can't undo this.",
//       action: 'delete',
//       actionFn: () => deleteHandler(project),
//     })
//   }

//   const deleteHandler = async (project: ProjectWithTasks | Project) => {
//     // mutate tasks locally
//     // mutate(
//     //   dateTaskKey(new Date(task.startDate).toDateString()),
//     //   (data: { data: TaskWithProject[] }) =>
//     //     data && removeTaskFromLocalTasksData(data.data, task.id),
//     //   false
//     // )

//     //mutate project locally
//     // mutate(
//     //   projectKey(task.projectId),
//     //   (data: { data: ProjectWithTasks }) =>
//     //     data && removeTaskFromLocalProjectData(data.data, task.id),
//     //   false
//     // )

//     if (callback) {
//       callback()
//     }

//     const request = async () => {
//       //send request
//       const { error } = await deleteProject(project.id)

//       // mutate(dateTaskKey(new Date(task.startDate).toDateString()))
//       mutate(projectsKey())

//       if (error) {
//         setNotification({
//           id: uniqueId(),
//           message: error,
//           variant: 'error',
//           action: 'try again',
//           actionFn: async () => {
//             setReSubmit(true)

//             setNotification({
//               id: uniqueId(),
//               message: 'deleting...',
//               variant: 'error',
//               loading: isReSubmitting,
//             })

//             await request()

//             setReSubmit(false)
//           },
//         })
//       } else {
//         setNotification({
//           id: uniqueId(),
//           message: 'project deleted!',
//           variant: 'success',
//         })
//       }
//     }

//     await request()
//   }

//   return { deleteProjectHandler: confirmBeforeDeleteHandler }
// }

// export default useDeleteProject
