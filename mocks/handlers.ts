import { rest } from 'msw'
import { multipleTasks } from '../common/data/tasks'
import { multipleProjects } from '../common/data/projects'
import { TaskType, Status, TaskProjectType } from '../common/types/TaskType'
import { ProjectType } from '../common/types/ProjectType'
import { completeTask, createTask, getDateTasks } from './taskControllers'
import { getProjectById } from './projectControllers'

const initialProjects = multipleProjects()
const initialTasks = multipleTasks(initialProjects)

//add tasks ids to projects
const projects: ProjectType[] = [...initialProjects].map((project) => {
  const addTasks = []
  let proposed = 0
  let inprogress = 0
  let completed = 0
  let progressPercentage = 0

  for (let task of initialTasks) {
    if (task.project === project.id) {
      if (task.status === Status.PROPOSED) proposed++
      if (task.status === Status.INPROGRESS) inprogress++
      if (task.status === Status.COMPLETED) completed++

      addTasks.push(task.id)
    }
  }

  progressPercentage = +(
    (completed * 100) /
    (proposed + completed + inprogress)
  ).toFixed(0)

  return {
    ...project,
    tasks: [...project.tasks, ...addTasks] as TaskType[],
    proposed,
    inprogress,
    completed,
    progressPercentage,
  }
})

//populate tasks with project details
const tasks: TaskType[] = [...initialTasks].map((task) => {
  const project = projects.find((p) => p.id === task.project)
  if (project) {
    return {
      ...task,
      project: {
        id: project.id,
        title: project.title,
        color: project.color,
      } as TaskProjectType,
    }
  }
  return task
})

type CreateTaskBody = {
  task: TaskType
}

export const handlers = [
  rest.get('/tasks', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(tasks))
  }),
  rest.get('/projects', (_, res, ctx) => {
    return res(ctx.json(projects))
  }),
  rest.get('/projects/:projectId', (req, res, ctx) => {
    return res(
      ctx.json(getProjectById(req.params.projectId as string, projects, tasks))
    )
  }),
  rest.get('/tasks/:date', (req, res, ctx) => {
    return res(ctx.json(getDateTasks(req.params.date as string, tasks)))
  }),
  rest.put('/tasks/:id', (req, res, ctx) => {
    return res(ctx.json(completeTask(req.params.id as string, tasks)))
  }),
  rest.post<CreateTaskBody>('/tasks', (req, res, ctx) => {
    if (req.body) {
      return res(ctx.json(createTask(req.body.task, tasks, projects)))
    }
  }),
]
