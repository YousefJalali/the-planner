import { uniqueId } from 'lodash'
import { useSWRConfig } from 'swr'
import { StatsType } from '../../../pages/api/projects/[project]/stats'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { dateTaskKey, projectKey } from '../../data/keys'
import {
  updateProjectStats,
  updateTaskStatusInLocalProject,
} from '../../data/localData/localProjectsData'
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
    const dateKey = dateTaskKey(new Date(task.startDate).toDateString())
    const projKey = projectKey(task.projectId)
    const statsKey = `${projectKey(task.projectId)}/stats`

    if (date) {
      mutate(
        dateKey,
        (data: { data: TaskWithProjectType[] }) =>
          data &&
          updateTaskStatusInLocalTasksData(data.data, task.id, newStatus),
        false
      )
    }

    if (projectId) {
      mutate(
        projKey,
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

      mutate(
        statsKey,
        (data: { data: StatsType }) =>
          data && updateProjectStats(data.data, oldStatus, newStatus),
        false
      )
    }

    const { data, error } = await changeTaskStatus(task.id, newStatus)

    mutate(dateKey)
    mutate(projKey)
    mutate(statsKey)

    if (callback) {
      callback()
    }

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
