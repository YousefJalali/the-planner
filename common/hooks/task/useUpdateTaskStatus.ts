import { uniqueId } from 'lodash'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { updateTaskStatusInLocalProject } from '../../data/localData/localProjectsData'
import { updateTaskStatusInLocalTasksData } from '../../data/localData/localTasksData'
import useDateTasks from '../../data/useDateTasks'
import useProject from '../../data/useProject'
import { ProjectWithTasksAndCount } from '../../types/ProjectType'
import { Status, TaskWithProjectType } from '../../types/TaskType'

const useUpdateTaskStatus = (
  projectId: string | null,
  date: string | null,
  callback?: (action?: any) => void
) => {
  const { setNotification } = useNotification()
  const { mutate: mutateDateTasks } = useDateTasks(date)
  const { mutate: mutateProject } = useProject(projectId)

  const taskStatusHandler = async (
    task: TaskWithProjectType,
    oldStatus: Status,
    newStatus: Status
  ) => {
    console.log('useUpdateTaskStatus called from: ', projectId, date)

    if (date) {
      mutateDateTasks(
        (data: { data: TaskWithProjectType[] }) =>
          data &&
          updateTaskStatusInLocalTasksData(data.data, task.id, newStatus),
        false
      )
    }

    if (projectId) {
      mutateProject(
        (data: { data: ProjectWithTasksAndCount }) =>
          data && updateTaskStatusInLocalProject(data.data, task.id, newStatus),
        false
      )
    }

    const { data, error } = await changeTaskStatus(task.id, newStatus)

    mutateDateTasks()
    mutateProject()

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
