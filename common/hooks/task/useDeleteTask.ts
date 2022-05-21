import { uniqueId } from 'lodash'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { deleteTask } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { usePrompt } from '../../contexts/PromptCtx'
import { dateTasksKey, projectKey } from '../../data/keys'
import { removeTaskFromLocalProjectData } from '../../data/localData/localProjectsData'
import { removeTaskFromLocalTasksData } from '../../data/localData/localTasksData'
import { ProjectWithTasksType } from '../../types/ProjectType'
import { TaskWithProjectType } from '../../types/TaskType'

const useDeleteTask = (callback?: (action?: any) => void) => {
  const [isReSubmitting, setReSubmit] = useState(false)

  const { setNotification } = useNotification()

  const { setPrompt } = usePrompt()

  const { mutate } = useSWRConfig()

  const confirmBeforeDeleteHandler = (task: TaskWithProjectType) => {
    setPrompt({
      id: 'delete-task',
      title: 'are you sure?',
      message: "you can't undo this",
      action: 'delete',
      actionFn: () => deleteHandler(task),
    })
  }

  const deleteHandler = async (task: TaskWithProjectType) => {
    // mutate tasks locally
    // mutate(
    //   dateTasksKey(new Date(task.startDate).toDateString()),
    //   (data: { data: TaskWithProjectType[] }) =>
    //     data && removeTaskFromLocalTasksData(data.data, task.id),
    //   false
    // )

    //mutate project locally
    // mutate(
    //   projectKey(task.projectId),
    //   (data: { data: ProjectWithTasksType }) =>
    //     data && removeTaskFromLocalProjectData(data.data, task.id),
    //   false
    // )

    if (callback) {
      callback()
    }

    const request = async () => {
      //send request
      const { error } = await deleteTask(task.id)

      mutate(dateTasksKey(new Date(task.startDate).toDateString()))
      mutate(projectKey(task.projectId))
      mutate(`${projectKey(task.projectId)}/stats`)

      if (error) {
        setNotification({
          id: uniqueId(),
          message: error,
          variant: 'critical',
          action: 'try again',
          actionFn: async () => {
            setReSubmit(true)

            setNotification({
              id: uniqueId(),
              message: 'deleting...',
              variant: 'critical',
              loading: isReSubmitting,
            })

            await request()

            setReSubmit(false)
          },
        })
      } else {
        setNotification({
          id: uniqueId(),
          message: 'task deleted!',
          variant: 'confirmation',
        })
      }
    }

    await request()
  }

  return { deleteTaskHandler: confirmBeforeDeleteHandler }
}

export default useDeleteTask
