import { Status, TaskProjectType, TaskType } from '../../common/types/TaskType'
import { v4 as uuidv4 } from 'uuid'
import { ProjectType } from '../../common/types/ProjectType'
import { indexOf } from 'lodash'

//get date tasks
export const getDateTasksController = (date: string, tasks: TaskType[]) => {
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
export const createTaskController = (
  task: TaskType,
  tasks: TaskType[],
  projects: ProjectType[]
) => {
  if (!task) {
    throw new Error('no task found')
  }

  const createdTask = {
    ...task,
    id: uuidv4(),
    status: Status.PROPOSED,
  }

  const project = projects.find((p) => p.id === createdTask.project)
  if (project) {
    //add new task id to project
    const indexOfProject = indexOf(projects, project)

    projects[indexOfProject].tasks.unshift(createdTask.id)
    projects[indexOfProject].proposed++

    //populate the project in task
    const populatedCreatedTask = {
      ...createdTask,
      project: {
        id: project.id,
        title: project.title,
        color: project.color,
      } as TaskProjectType,
    } as TaskType

    // tasks = [{ ...populatedCreateTask }, ...tasks]
    tasks.unshift({ ...populatedCreatedTask })

    return { success: true, data: populatedCreatedTask }
  }
}

export const deleteTaskController = (taskId: string, tasks: TaskType[]) => {
  for (let task of tasks) {
    if (task.id === taskId) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks.splice(index, 1)
      }

      return { success: true }
    }
  }
}

export const editTaskController = (
  updatedTask: TaskType,
  tasks: TaskType[],
  projects: ProjectType[]
) => {
  for (let task of tasks) {
    if (task.id === updatedTask.id) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        const project = projects.find((p) => p.id === updatedTask.project)
        if (project) {
          updatedTask.project = {
            id: project.id,
            title: project.title,
            color: project.color,
          }

          tasks.splice(index, 1, updatedTask)
        }
      }

      return { success: true }
    }
  }
}

export const changeTaskStatusController = (
  taskId: string,
  status: Status,
  tasks: TaskType[]
) => {
  for (let task of tasks) {
    if (task.id === taskId) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks[index].status = status
      }

      return { success: true }
    }
  }
}
