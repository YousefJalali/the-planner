import {
  ProjectType,
  ProjectWithTasksType,
} from '../../common/types/ProjectType'
import { TaskType } from '../../common/types/TaskType'
import { v4 as uuidv4 } from 'uuid'
import { apiYupValidation } from '../../common/hooks/useYupValidationResolver'
import projectSchema from '../../common/utils/validations/projectSchema'
import _, { indexOf } from 'lodash'
import { GET, populateTask, POST, PUT } from '../handlers'

export const getRecentProjects = (
  { req, res, ctx }: GET,
  projects: ProjectType[]
) => {
  return res(ctx.json({ data: projects.slice(0, 5) }))
}

export const getInfiniteProjects = (
  { req, res, ctx }: GET,
  projects: ProjectType[]
) => {
  // return res(
  //   ctx.status(400),
  //   ctx.json({
  //     error: 'wrong',
  //   })
  // )

  const qLimit = req.url.searchParams.get('limit')
  const qCursor = req.url.searchParams.get('cursor')

  if (qLimit) {
    let indexOfCursor = 0
    const limit = +qLimit

    if (qCursor) {
      const findIndexOfCursor = _.findIndex(projects, function (o) {
        return o.id === qCursor
      })
      indexOfCursor = findIndexOfCursor + 1 || 0
    }

    const nextCursor =
      projects[+limit + indexOfCursor - 1]?.id ||
      projects[projects.length - 1]?.id

    return res(
      ctx.json({
        data: projects.slice(indexOfCursor, limit + indexOfCursor),
        nextCursor,
      })
    )
  }

  return res(ctx.json({ data: projects }))
}

export const getProjectById = (
  { req, res, ctx }: GET,
  projects: ProjectType[],
  tasks: TaskType[]
) => {
  const id = req.params.projectId

  const project = projects.find((project) => project.id === id) as ProjectType

  if (!project) {
    return res(
      ctx.status(404),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
  }

  const tasksInProject = []
  for (let task of tasks) {
    if (task.projectId === id) {
      tasksInProject.push(task)
    }
  }

  const populatedProject: ProjectWithTasksType = {
    ...project,
    tasks: tasksInProject.map((task) => populateTask(task)),
  }

  return res(
    ctx.status(200),
    ctx.json({
      data: populatedProject,
    })
  )
}

export const createProjectController = async (
  { req, res, ctx }: POST<ProjectType>,
  projects: ProjectType[]
) => {
  const project = req.body

  if (!project) {
    return res(ctx.json({ error: 'Something went wrong, please try again' }))
  }

  const createdProject = {
    ...project,
    id: uuidv4(),
  } as ProjectType

  //validate form
  const validate = await apiYupValidation<ProjectType>(
    projectSchema,
    createdProject
  )

  if (!_.isEmpty(validate.errors)) {
    return res(ctx.json({ validationErrors: validate.errors }))
  }

  projects.unshift({ ...createdProject })

  return res(ctx.status(201), ctx.json({ data: createdProject }))
}

export const editProjectController = async (
  { req, res, ctx }: PUT<ProjectType>,
  projects: ProjectType[]
) => {
  const updatedProject = req.body

  if (!updatedProject) {
    return res(ctx.json({ error: 'Something went wrong, please try again' }))
  }

  //validate form
  const validate = await apiYupValidation<ProjectType>(
    projectSchema,
    updatedProject
  )
  if (!_.isEmpty(validate.errors)) {
    return res(ctx.json({ validationErrors: validate.errors }))
  }

  for (let project of projects) {
    if (project.id === updatedProject.id) {
      const index = indexOf(projects, project)
      if (index > -1) {
        projects.splice(index, 1, { ...updatedProject })
      }
    }
  }

  return res(ctx.status(201), ctx.json({ data: updatedProject }))
}

//-----------------delete project-----------------
export const deleteProjectController = (
  { req, res, ctx }: GET,
  projects: ProjectType[],
  tasks: TaskType[]
) => {
  const projectId = req.params.id

  if (!projectId) return

  const findProject = projects.find((project) => project.id === projectId)

  if (!findProject) {
    return res(ctx.status(404), ctx.json({ error: 'no project found!' }))
  }

  // delete all tasks related to project
  for (let task of tasks) {
    if (task.projectId === projectId) {
      console.log(task)
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    }
  }

  //delete project from projects
  for (let project of projects) {
    if (project.id === projectId) {
      const index = indexOf(projects, project)
      if (index > -1) {
        projects.splice(index, 1)
      }
    }
  }

  return res(ctx.status(201), ctx.json({ data: projectId }))
}
