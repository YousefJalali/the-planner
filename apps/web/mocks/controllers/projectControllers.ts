import {
  ProjectTasksCount,
  Project,
  ProjectWithTasks,
} from '@the-planner/types'
import { Status, Task } from '@the-planner/types'
import { v4 as uuidv4 } from 'uuid'
// import { apiYupValidation } from '@the-planner/hooks'
// import { projectFormValidation } from '@the-planner/utils'
import _, { indexOf } from 'lodash'
import { countTasksInProject, GET, populateTask, POST, PUT } from '../handlers'

export const getInfiniteProjects = (
  { req, res, ctx }: GET,
  projects: Project[]
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
        data: projects
          .slice(indexOfCursor, limit + indexOfCursor)
          .map((p) => ({ ...p, _count: { tasks: countTasksInProject(p) } })),
        nextCursor,
      })
    )
  }

  return res(
    ctx.json({
      data: projects.map((p) => ({
        ...p,
        _count: { tasks: countTasksInProject(p) },
      })),
    })
  )
}

export const getProjectById = (
  { req, res, ctx }: GET,
  projects: Project[],
  tasks: Task[]
) => {
  const id = req.params.projectId

  const project = projects.find((project) => project.id === id) as Project

  if (!project) {
    return res(
      ctx.status(404),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
  }

  const tasksInProject = []
  for (const task of tasks) {
    if (task.projectId === id) {
      tasksInProject.push(task)
    }
  }

  const populatedProject: ProjectWithTasks & ProjectTasksCount = {
    ...project,
    tasks: tasksInProject.map((task) => populateTask(task)),
    _count: { tasks: countTasksInProject(project) },
  }

  return res(
    ctx.status(200),
    ctx.json({
      data: populatedProject,
    })
  )
}

export const getProjectStats = (
  { req, res, ctx }: GET,
  projects: Project[],
  tasks: Task[]
) => {
  const id = req.params.projectId

  const project = projects.find((project) => project.id === id) as Project

  if (!project) {
    return res(
      ctx.status(404),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
  }

  let proposed = 0
  let inprogress = 0
  let completed = 0

  for (const task of tasks) {
    if (task.projectId === id) {
      if (task.status === Status.PROPOSED) proposed++
      if (task.status === Status.INPROGRESS) inprogress++
      if (task.status === Status.COMPLETED) completed++
    }
  }

  return res(
    ctx.status(200),
    ctx.json({
      data: [
        { _count: { _all: proposed }, status: Status.PROPOSED },
        { _count: { _all: inprogress }, status: Status.INPROGRESS },
        { _count: { _all: completed }, status: Status.COMPLETED },
      ],
    })
  )
}

export const createProjectController = async (
  { req, res, ctx }: POST<Project>,
  projects: Project[]
) => {
  const project = req.body

  if (!project) {
    return res(ctx.json({ error: 'Something went wrong, please try again' }))
  }

  const createdProject = {
    ...project,
    id: uuidv4(),
  } as Project

  //validate form
  // const validate = await apiYupValidation<Project>(
  //   projectFormValidation,
  //   createdProject
  // )

  // if (!_.isEmpty(validate.errors)) {
  //   return res(ctx.json({ validationErrors: validate.errors }))
  // }

  projects.unshift({ ...createdProject })

  return res(ctx.status(201), ctx.json({ data: createdProject }))
}

export const editProjectController = async (
  { req, res, ctx }: PUT<Project>,
  projects: Project[]
) => {
  const updatedProject = req.body

  if (!updatedProject) {
    return res(ctx.json({ error: 'Something went wrong, please try again' }))
  }

  //validate form
  // const validate = await apiYupValidation<Project>(
  //   projectFormValidation,
  //   updatedProject
  // )
  // if (!_.isEmpty(validate.errors)) {
  //   return res(ctx.json({ validationErrors: validate.errors }))
  // }

  for (const project of projects) {
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
  projects: Project[],
  tasks: Task[]
) => {
  const projectId = req.params.id

  if (!projectId) return

  const findProject = projects.find((project) => project.id === projectId)

  if (!findProject) {
    return res(ctx.status(404), ctx.json({ error: 'no project found!' }))
  }

  // delete all tasks related to project
  for (const task of tasks) {
    if (task.projectId === projectId) {
      console.log(task)
      const index = indexOf(tasks, task)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    }
  }

  //delete project from projects
  for (const project of projects) {
    if (project.id === projectId) {
      const index = indexOf(projects, project)
      if (index > -1) {
        projects.splice(index, 1)
      }
    }
  }

  return res(ctx.status(201), ctx.json({ data: projectId }))
}
