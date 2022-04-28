import { uniqueId } from 'lodash'
import { useSWRConfig } from 'swr'
import { changeTaskStatus } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { dateTaskKey, projectKey } from '../../data/keys'
import { updateTaskStatusInLocalProject } from '../../data/localData/localProjectsData'
import { updateTaskStatusInLocalTasksData } from '../../data/localData/localTasksData'
import { ProjectWithTasksType } from '../../types/ProjectType'
import { Status, TaskWithProjectType } from '../../types/TaskType'

const useUpdateTaskStatus = (callback?: (action?: any) => void) => {
  // const [isSubmitting, setSubmit] = useState(false)

  const { setNotification } = useNotification()

  const { mutate } = useSWRConfig()

  const taskStatusHandler = async (
    task: TaskWithProjectType,
    status: Status
  ) => {
    // mutate tasks locally
    mutate(
      dateTaskKey(new Date(task.startDate).toDateString()),
      (data: { data: TaskWithProjectType[] }) =>
        data && updateTaskStatusInLocalTasksData(data.data, task.id, status),
      false
    )

    //mutate project locally
    mutate(
      projectKey(task.projectId),
      (data: { data: ProjectWithTasksType }) =>
        data && updateTaskStatusInLocalProject(data.data, task.id, status),
      false
    )

    const { data, error } = await changeTaskStatus(task.id, status)

    mutate(dateTaskKey(new Date(task.startDate).toDateString()))
    mutate(projectKey(task.projectId))

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
