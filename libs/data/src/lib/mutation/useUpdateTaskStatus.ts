import useSWRMutation from 'swr/mutation'

import { useNotification } from '@the-planner/hooks'
import { TaskWithProject } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { changeTaskStatus } from '../actions'

export const useUpdateTaskStatus = ({ taskId }: { taskId: string }) => {
  const { trigger, error, isMutating } = useSWRMutation(
    ['/api/tasks', `?taskId=${taskId}`],
    (url, arg) => changeTaskStatus(url, arg)
  )
  // const { trigger, error, isMutating } = useSWRMutation(
  //   '/api/tasks',
  //   (url, arg) => changeTaskStatus([url, `?taskId=${taskId}`], arg)
  // )

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
        setNotification({
          message: 'status updated!',
          variant: 'success',
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, error, isMutating }
}

// import { uniqueId } from 'lodash'
// import { useRouter } from 'next/router'
// import { changeTaskStatus } from '../actions'
// import { useNotification } from '@the-planner/hooks'

// import useDateTasks from '../query/useDateTasks'
// import { useProject, useTask } from '../query'
// import { Status } from '@the-planner/types'
// import { getErrorMessage } from '@the-planner/utils'

// type Props = {
//   date?: string
//   callback?: (action?: any) => void
// }

// export const useUpdateTaskStatus = ({ callback, date }: Props) => {
//   const { setNotification } = useNotification()

//   const router = useRouter()
//   const { d: urlDate, projectId, taskId } = router.query

//   const { mutate: mutateDateTasks, dateTasks } = useDateTasks(
//     (urlDate as string) && date ? date : null
//   )
//   const { mutate: mutateProject, project } = useProject(projectId as string)
//   const { mutate: mutateTask, task } = useTask(taskId as string)

//   const taskStatusHandler = async ({
//     taskId,
//     newStatus,
//   }: {
//     taskId: string
//     newStatus: Status
//   }) => {
//     console.log(date)

//     const request = async () => {
//       console.log('request')
//       try {
//         const { data: updatedTask } = await changeTaskStatus(taskId, newStatus)

//         if (!updatedTask) {
//           throw new Error('Something went wrong!')
//         }

//         return updatedTask
//       } catch (error) {
//         setNotification({
//           id: uniqueId(),
//           message: getErrorMessage(error),
//           variant: 'error',
//         })

//         return null
//       }
//     }

//     // in date tasks
//     if (date) {
//       const updatedTasks = {
//         data: dateTasks.map((t) =>
//           t.id === taskId ? { ...t, status: newStatus } : t
//         ),
//       }

//       mutateDateTasks(
//         async () => {
//           const updatedTask = await request()
//           return {
//             data: dateTasks.map((t) =>
//               t.id === updatedTask?.id ? updatedTask : t
//             ),
//           }
//         },
//         {
//           optimisticData: updatedTasks,
//           rollbackOnError: true,
//         }
//       )
//     }

//     // in project details
//     if (projectId) {
//       const updatedProject = {
//         data: {
//           ...project,
//           tasks: project.tasks.map((t) =>
//             t.id === taskId ? { ...t, status: newStatus } : t
//           ),
//         },
//       }

//       mutateProject(
//         async () => {
//           const updatedTask = await request()

//           return {
//             data: updatedTask
//               ? {
//                   ...project,
//                   tasks: project.tasks.map((t) =>
//                     t.id === updatedTask.id ? updatedTask : t
//                   ),
//                 }
//               : project,
//           }
//         },
//         {
//           optimisticData: updatedProject,
//           rollbackOnError: true,
//         }
//       )
//     }

//     // in task details
//     if (taskId) {
//       const updatedTask = {
//         data: {
//           ...task,
//           status: newStatus,
//         },
//       }

//       mutateTask(
//         async () => {
//           const req = await request()
//           return {
//             data: {
//               ...task,
//               status: req.status,
//             },
//           }
//         },
//         {
//           optimisticData: updatedTask,
//           rollbackOnError: true,
//         }
//       )
//     }

//     if (callback) {
//       callback()
//     }
//   }

//   return { taskStatusHandler }
// }

// export default useUpdateTaskStatus
