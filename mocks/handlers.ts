import { rest } from 'msw'
import getTasks from '../common/data/AllTasks'
import getProjects from '../common/data/AllProjects'

const projects = getProjects()
const tasks = getTasks(projects)

export const handlers = [
  rest.get('/tasks', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(tasks))
  }),
  rest.get('/projects', (_, res, ctx) => {
    return res(ctx.json(projects))
  }),
]
