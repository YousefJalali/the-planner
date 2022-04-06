import {
  DefaultRequestBody,
  ResponseComposition,
  RestContext,
  RestRequest,
} from 'msw'
import { ProjectType } from '../../common/types/ProjectType'
import { TaskType } from '../../common/types/TaskType'
import { v4 as uuidv4 } from 'uuid'
import { apiYupValidation } from '../../common/utils/validations/useYupValidationResolver'
import projectSchema from '../../common/utils/validations/projectSchema'
import _ from 'lodash'

export const getInfiniteProjects = (
  projects: ProjectType[],
  page: string | null,
  limit: string | null
) => {
  if (!page || !limit) return
  // if (+page === 3) throw Error
  return projects.slice((+page - 1) * +limit, +limit * +page)
}

export const getProjectById = (
  id: string,
  projects: ProjectType[],
  tasks: TaskType[]
) => {
  const project = projects.find((project) => project.id === id) as ProjectType

  if (project) {
    const tasksInProject = []
    for (let taskId of project.tasks) {
      const task = tasks.find((t) => t.id === taskId)

      if (task) {
        tasksInProject.push(task)
      }
    }

    return {
      ...project,
      tasks: [...tasksInProject],
    }
  }
}

export const createProjectController = async (
  req: RestRequest<{ project: ProjectType }>,
  res: ResponseComposition<DefaultRequestBody>,
  ctx: RestContext,
  projects: ProjectType[]
) => {
  const { project } = req.body

  if (!project) {
    return res(
      ctx.status(400),
      ctx.json({ error: 'Something went wrong, please try again' })
    )
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
    return res(ctx.status(400), ctx.json({ error: validate.errors }))
  }

  projects.unshift({ ...createdProject })

  return res(ctx.status(201), ctx.json({ data: createdProject }))
}
