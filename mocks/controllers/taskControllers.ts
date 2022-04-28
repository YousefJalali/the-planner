import {
  Status,
  TaskType,
  TaskWithProjectType,
} from '../../common/types/TaskType'
import { v4 as uuidv4 } from 'uuid'
import {
  ProjectType,
  ProjectWithTasksType,
} from '../../common/types/ProjectType'
import _, { indexOf } from 'lodash'
import taskSchema from '../../common/utils/validations/taskSchema'
import { apiYupValidation } from '../../common/utils/validations/useYupValidationResolver'

import { FieldError, FieldErrors } from 'react-hook-form'
import { GET, populateTask, POST, PUT } from '../handlers'
import isValid from 'date-fns/isValid'

//-----------------get date tasks-----------------
export const getDateTasksController = (
  { req, res, ctx }: GET,
  tasks: TaskType[]
) => {
  const date = req.url.searchParams.get('d')

  if (!date || typeof date !== 'string' || !isValid(new Date(date))) {
    return res(ctx.json({ error: 'Invalid date' }))
  }

  const data = tasks.filter((task) => {
    let dateWithoutTime = null

    if (isValid(task.startDate)) {
      dateWithoutTime = task.startDate.setHours(0, 0, 0, 0)
    } else {
      dateWithoutTime = new Date(task.startDate).setHours(0, 0, 0, 0)
    }

    return new Date(dateWithoutTime).toDateString() === date
  })

  const populatedTasks = data.map((task) => populateTask(task))

  return res(ctx.json({ data: populatedTasks }))
}

//-----------------get date tasks-----------------
export const getTaskByIdController = (
  { req, res, ctx }: GET,
  tasks: TaskType[]
) => {
  const { id } = req.params

  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return res(ctx.json({ error: 'Task not found' }))
  }

  return res(ctx.json({ data: populateTask(task) }))
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
  const project = projects.find((p) => p.id === createdTask.projectId)

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

  tasks.unshift({ ...createdTask })

  //populate the project in task
  const populatedCreatedTask = {
    ...createdTask,
    project: {
      title: project.title,
      color: project.color,
    },
  } as TaskWithProjectType

  return res(ctx.status(201), ctx.json({ data: populatedCreatedTask }))
}

// -----------------edit task-----------------
export const editTaskController = (
  { req, res, ctx }: PUT<TaskType>,
  tasks: TaskType[],
  projects: ProjectType[]
) => {
  const updatedTask = req.body

  if (!updatedTask) {
    return res(
      ctx.status(400),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
  }

  let populatedUpdatedTask = null

  for (let task of tasks) {
    if (task.id === updatedTask.id) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        const project = projects.find((p) => p.id === updatedTask.projectId)
        if (project) {
          tasks.splice(index, 1, updatedTask)

          //populate task
          populatedUpdatedTask = {
            ...updatedTask,
            project: {
              title: project.title,
              color: project.color,
            },
          } as TaskWithProjectType
        }
      }
    }
  }

  if (!populatedUpdatedTask) {
    return res(
      ctx.status(400),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
  }

  return res(ctx.json({ data: populatedUpdatedTask }))
}

// -----------------change task status-----------------
export const changeTaskStatusController = (
  { req, res, ctx }: PUT<TaskType>,
  tasks: TaskType[]
) => {
  const taskId = req.params.id
  const status = req.url.searchParams.get('status') as Status

  if (!taskId || !status) {
    return res(ctx.json({ error: 'Invalid request' }))
  }

  for (let task of tasks) {
    if (task.id === taskId) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks[index].status = status
      }
    }
  }

  return res(ctx.json({ data: taskId }))
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
    return res(ctx.status(404), ctx.json({ error: 'no task found!' }))
  }

  for (let task of tasks) {
    if (task.id === taskId) {
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    }
  }

  return res(ctx.status(201), ctx.json({ data: taskId }))
}
