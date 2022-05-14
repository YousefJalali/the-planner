import { uniqueId } from 'lodash'
import { useSWRConfig } from 'swr'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { dateTaskKey, projectKey } from '../../data/keys'
import { updateTaskStatusInLocalProject } from '../../data/localData/localProjectsData'
import { updateTaskStatusInLocalTasksData } from '../../data/localData/localTasksData'
import { ProjectWithTasksType } from '../../types/ProjectType'
import { Status, TaskWithProjectType } from '../../types/TaskType'

const useUpdateTaskStatus = (
  projectId: string | null,
  date: string | null,
  callback?: (action?: any) => void
) => {
  const { setNotification } = useNotification()

  const { mutate } = useSWRConfig()

  const taskStatusHandler = async (
    task: TaskWithProjectType,
    oldStatus: Status,
    newStatus: Status
  ) => {
    console.log('useUpdateTaskStatus called from: ', projectId, date)

    if (date) {
      mutate(
        dateTaskKey(new Date(task.startDate).toDateString()),
        (data: { data: TaskWithProjectType[] }) =>
          data &&
          updateTaskStatusInLocalTasksData(data.data, task.id, newStatus),
        false
      )
    }

    if (projectId) {
      mutate(
        projectKey(task.projectId),
        (data: { data: ProjectWithTasksType }) =>
          data &&
          updateTaskStatusInLocalProject(
            data.data,
            task.id,
            oldStatus,
            newStatus
          ),
        false
      )
    }

    const { data, error } = await changeTaskStatus(task.id, newStatus)

    mutate(dateTaskKey(new Date(task.startDate).toDateString()))
    mutate(projectKey(task.projectId))
    mutate(`${projectKey(task.projectId)}/stats`)

    if (callback) {
      callback()
    }
    // setStatusModal(false)
    // setOptionsModal(false)

    if (error) {
      setNotification({
        id: uniqueId(),
        message: error,
        variant: 'critical',
      })
    }
  }

  return { taskStatusHandler }
}

export default useUpdateTaskStatus
