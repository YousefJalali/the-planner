import { Status, TaskProjectType, TaskType } from '../common/types/TaskType'
import { v4 as uuidv4 } from 'uuid'
import { ProjectType } from '../common/types/ProjectType'
import { indexOf } from 'lodash'

//get date tasks
export const getDateTasks = (date: string, tasks: TaskType[]) => {
  return tasks.filter((task) => {
    let removeTime = null

    if (task.date.startDate instanceof Date) {
      removeTime = task.date.startDate.setHours(0, 0, 0, 0)
    } else {
      removeTime = new Date(task.date.startDate).setHours(0, 0, 0, 0)
    }

    return new Date(removeTime).toDateString() === date
  })
}

//create tasks
export const createTask = (
  task: TaskType,
  tasks: TaskType[],
  projects: ProjectType[]
) => {
  if (!task) {
    throw new Error('no task found')
  }

  const date = {
    startDate: new Date(task.date.startDate),
    endDate: null,
  }

  const time = {
    startTime: null,
    endTime: null,
  }

  // if (task.hasTime) {
  //   startDate.setHours(0, 0, 0, 0)
  //   endDate = null
  //   startTime = null
  //   endTime = null
  // } else {
  //   startDate.setHours(0, 0, 0, 0)
  //   endDate = null
  //   startTime = null
  //   endTime = null
  // }

  const createTask = {
    ...task,
    id: uuidv4(),
    status: Status.PROPOSED,
  }

  const project = projects.find((p) => p.id === createTask.project)
  if (project) {
    const populatedCreateTask = {
      ...createTask,
      project: {
        id: project.id,
        title: project.title,
        color: project.color,
      } as TaskProjectType,
    } as TaskType

    // tasks = [{ ...populatedCreateTask }, ...tasks]
    tasks.unshift({ ...populatedCreateTask })

    return { success: true, data: populatedCreateTask }
  }
}

//check & uncheck tasks handler
export const completeTask = (taskId: string, tasks: TaskType[]) => {
  // const taskToComplete = tasks.find((task) => task.id === taskId)

  // if (!taskToComplete) throw new Error('no task found')

  // tasks = tasks.map((task) =>
  //   task.id === taskToComplete.id
  //     ? {
  //         ...task,
  //         status:
  //           task.status === Status.COMPLETED
  //             ? Status.PROPOSED
  //             : Status.COMPLETED,
  //       }
  //     : task
  // )

  // const updatedTask = tasks.find((task) => task.id === taskId)

  // return { success: true, data: updatedTask }

  //mutating the array in 'handlers.js'
  for (let task of tasks) {
    if (task.id === taskId) {
      const index = indexOf(tasks, task)
      tasks[index].status =
        tasks[index].status === Status.COMPLETED
          ? Status.PROPOSED
          : Status.COMPLETED

      return { success: true, data: tasks[index] }
    }
  }
}
