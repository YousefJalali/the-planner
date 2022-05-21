import { format } from 'date-fns'
import { uniqueId } from 'lodash'
import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { dateTasksKey } from '../../data/keys'
import { updateTaskStatusInLocalProject } from '../../data/localData/localProjectsData'
import { updateTaskStatusInLocalTasksData } from '../../data/localData/localTasksData'
import useDateTasks from '../../data/useDateTasks'
import useProject from '../../data/useProject'
import { ProjectWithTasksAndCount } from '../../types/ProjectType'
import { Status, TaskWithProjectType } from '../../types/TaskType'
import getErrorMessage from '../../utils/getErrorMessage'

const useUpdateTaskStatus = (
  projectId: string | null,
  date: string | null,
  callback?: (action?: any) => void
) => {
  console.log(date)

  const { setNotification, clearNotification } = useNotification()
  const { mutate } = useSWRConfig()
  const { mutate: mutateDateTasks, dateTasks } = useDateTasks(date)
  const { mutate: mutateProject } = useProject(projectId)

  // useEffect(() => {
  //   if (error) {
  //     setNotification({
  //       id: uniqueId(),
  //       message: error,
  //       variant: 'critical',
  //     })
  //   }

  //   return () => {
  //     setError(null)
  //     clearNotification()
  //   }
  // }, [error])

  const taskStatusHandler = async ({
    // tasks,
    taskId,
    newStatus,
  }: {
    // tasks: TaskWithProjectType[]
    taskId: string
    newStatus: Status
  }) => {
    // console.log('useUpdateTaskStatus called from: ', projectId, date)
    // console.log(tasks, task, newStatus)

    const request = async () => {
      try {
        await changeTaskStatus(taskId, newStatus)
      } catch (error) {
        setNotification({
          id: uniqueId(),
          message: getErrorMessage(error),
          variant: 'critical',
        })
      }
    }

    if (date) {
      const updatedTasks = dateTasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
      console.log('updatedTasks', updatedTasks)

      mutateDateTasks(() => ({ data: updatedTasks }), false)
      await request()
      mutateDateTasks()

      // await changeTaskStatus(taskId, newStatus)
      // mutateDateTasks(changeTaskStatus(taskId, newStatus), {
      //   optimisticData: { data: updatedTasks },
      //   rollbackOnError: true,
      // })

      // try {
      //   const hola = await mutateDateTasks(
      //     changeTaskStatus(taskId, newStatus),
      //     {
      //       optimisticData: { data: updatedTasks },
      //       rollbackOnError: true,
      //     }
      //   )

      //   console.log(hola)
      // } catch (error) {
      //   if (error) {
      //     setNotification({
      //       id: uniqueId(),
      //       message: getErrorMessage(error),
      //       variant: 'critical',
      //     })
      //   }
      //   // console.log(getErrorMessage(error))
      //   setError(getErrorMessage(error))
      // }
    }

    if (projectId) {
      mutateProject(
        (data: { data: ProjectWithTasksAndCount }) =>
          data && updateTaskStatusInLocalProject(data.data, taskId, newStatus),
        false
      )
    }

    // const { data, error } = await changeTaskStatus(taskId, newStatus)

    if (callback) {
      callback()
    }

    // if (error) {
    //   setNotification({
    //     id: uniqueId(),
    //     message: error,
    //     variant: 'critical',
    //   })
    // }
  }

  return { taskStatusHandler }
}

export default useUpdateTaskStatus
