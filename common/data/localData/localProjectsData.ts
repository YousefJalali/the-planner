import _ from 'lodash'
import { StatsType } from '../../../pages/api/projects/[project]/stats'
import { ProjectWithTasksType } from '../../types/ProjectType'
import { Status, TaskType } from '../../types/TaskType'
import { updateProjectProgress } from '../../utils/updateProjectProgress'

//create task
export const addTaskToLocalProjectData = (
  data: ProjectWithTasksType,
  formData: TaskType
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    resolve({
      data: { ...data, tasks: [formData, ...data.tasks] as TaskType[] },
    })
  })
}

//delete task
export const removeTaskFromLocalProjectData = (
  data: ProjectWithTasksType,
  id: string
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    resolve({
      data: {
        ...data,
        tasks: (data.tasks as TaskType[]).filter((task) => task.id !== id),
      },
    })
  })
}

//edit project
// export const updateProjectInLocalProjectId = (
//   data: ProjectType,
//   formData: ProjectType
// ) => {
//   return new Promise<{ data: ProjectType }>((resolve, reject) => {
//     resolve({ data: { ...formData } })
//   })
// }

//edit task
export const updateTaskInLocalProject = (
  data: ProjectWithTasksType,
  formData: TaskType
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    resolve({
      data: {
        ...data,
        tasks: data.tasks.map((task) => {
          return task.id === formData.id ? { ...formData } : task
        }),
      },
    })
  })
}

export const updateTaskStatusInLocalProject = (
  data: ProjectWithTasksType,
  taskId: string,
  oldStatus: Status,
  newStatus: Status
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    let countOfCompletedTasks = data.countOfCompletedTasks
    if (newStatus === Status.COMPLETED) countOfCompletedTasks++
    if (oldStatus === Status.COMPLETED && newStatus !== Status.COMPLETED)
      countOfCompletedTasks--

    resolve({
      data: {
        ...data,
        countOfCompletedTasks,
        tasks: (data.tasks as TaskType[]).map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      },
    })
  })
}

export const updateProjectStats = (
  data: StatsType,
  oldStatus: Status,
  newStatus: Status
) => {
  let hasNewStatus = false

  let updated = data.map((stat) => {
    if (stat.status === newStatus) {
      hasNewStatus = true
      return {
        ...stat,
        _count: {
          _all: stat._count._all + 1,
        },
      }
    }

    if (stat.status === oldStatus) {
      return {
        ...stat,
        _count: {
          _all: stat._count._all - 1,
        },
      }
    }
    return stat
  })

  if (!hasNewStatus) {
    updated = [
      ...updated,
      {
        status: newStatus,
        _count: {
          _all: 1,
        },
      },
    ]
  }

  return new Promise<{ data: StatsType }>((resolve, reject) => {
    resolve({
      data: updated.filter((stat) => stat._count._all !== 0),
    })
  })
}
