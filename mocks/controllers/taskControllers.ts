import { Status, TaskProjectType, TaskType } from '../../common/types/TaskType'
import { v4 as uuidv4 } from 'uuid'
import { ProjectType } from '../../common/types/ProjectType'
import _, { indexOf } from 'lodash'
import taskSchema from '../../common/utils/validations/taskSchema'
import { apiYupValidation } from '../../common/utils/validations/useYupValidationResolver'
import {
  DefaultRequestBody,
  ResponseComposition,
  ResponseResolver,
  RestContext,
  RestRequest,
} from 'msw'
import { FieldError, FieldErrors } from 'react-hook-form'

type POST<T> = {
  req: RestRequest<T>
  res: ResponseComposition<DefaultRequestBody>
  ctx: RestContext
}

type GET = {
  req: RestRequest
  res: ResponseComposition<DefaultRequestBody>
  ctx: RestContext
}

//-----------------get date tasks-----------------
export const getDateTasksController = (date: string, tasks: TaskType[]) => {
  return tasks.filter((task) => {
    let dateWithoutTime = null

    if (task.date.startDate instanceof Date) {
      dateWithoutTime = task.date.startDate.setHours(0, 0, 0, 0)
    } else {
      dateWithoutTime = new Date(task.date.startDate).setHours(0, 0, 0, 0)
    }

    return new Date(dateWithoutTime).toDateString() === date
  })
}

//-----------------create tasks-----------------
export const createTaskController = async (
  { req, res, ctx }: POST<TaskType>,
  tasks: TaskType[],
  projects: ProjectType[]
) => {
  const task = req.body

  if (!task) {
    return res(
      ctx.status(400),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
  }

  const createdTask = {
    ...task,
    id: uuidv4(),
    status: Status.PROPOSED,
  } as TaskType

  //validate form
  const validate = await apiYupValidation<TaskType>(taskSchema, createdTask)

  if (!_.isEmpty(validate.errors)) {
    return res(ctx.json({ validationErrors: validate.errors }))
  }

  //check if project exist in DB
  const project = projects.find((p) => p.id === createdTask.project)

  if (!project) {
    return res(
      ctx.json({
        validationErrors: {
          project: {
            type: 'required',
            message: 'Cannot find the selected project',
          } as FieldErrors<TaskType>,
        },
      })
    )
  }

  //add new task id to project
  ;(projects[indexOf(projects, project)].tasks as string[]).unshift(
    createdTask.id
  )
  projects[indexOf(projects, project)].proposed++

  //populate the project in task
  const populatedCreatedTask = {
    ...createdTask,
    project: {
      id: project.id,
      title: project.title,
      color: project.color,
    } as TaskProjectType,
  } as TaskType

  if (!populatedCreatedTask) {
    res(ctx.status(403, 'something went wrong, please try again'))
  }

  tasks.unshift({ ...populatedCreatedTask })

  return res(ctx.status(201), ctx.json({ data: populatedCreatedTask }))
}

//-----------------delete task-----------------
export const deleteTaskController = (
  { req, res, ctx }: GET,
  tasks: TaskType[]
) => {
  const taskId = req.params.id

  if (!taskId) return

  const findTask = tasks.find((task) => task.id === taskId)

  if (!findTask) {
    return res(ctx.json({ error: 'No task found!' }))
  }

  for (let task of tasks) {
    if (task.id === taskId) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    }
  }

  return res(ctx.status(201), ctx.json({}))
}

// -----------------edit task-----------------
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

// -----------------change task status-----------------
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
