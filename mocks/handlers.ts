import { rest } from 'msw'
import { multipleTasks } from '../common/data/tasks'
import { multipleProjects } from '../common/data/projects'
import { TaskType, Status, TaskProjectType } from '../common/types/TaskType'
import { ProjectType } from '../common/types/ProjectType'
import {
  createTaskController,
  deleteTaskController,
  editTaskController,
  getDateTasksController,
  changeTaskStatusController,
} from './controllers/taskControllers'
import { getProjectById } from './controllers/projectControllers'

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
    tasks: [...project.tasks, ...addTasks] as string[],
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

export const handlers = [
  //get all tasks
  rest.get('/tasks', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(tasks))
  }),

  //create a task
  rest.post<{ task: TaskType }>('/tasks', (req, res, ctx) => {
    if (req.body) {
      return res(ctx.json(createTaskController(req.body.task, tasks, projects)))
    }
  }),

  //UPDATE A TASK
  rest.post<{ task: TaskType }>('/tasks/:id', (req, res, ctx) => {
    if (req.body) {
      return res(ctx.json(editTaskController(req.body.task, tasks, projects)))
    }
  }),

  //get date tasks
  rest.get('/tasks/:date', (req, res, ctx) => {
    return res(
      ctx.json(getDateTasksController(req.params.date as string, tasks))
    )
  }),

  //change task status
  rest.put('/tasks/:id', (req, res, ctx) => {
    return res(
      ctx.json(
        changeTaskStatusController(
          req.params.id as string,
          req.url.searchParams.get('status') as Status,
          tasks
        )
      )
    )
  }),

  //delete a task
  rest.delete('/tasks/:id', (req, res, ctx) => {
    return res(ctx.json(deleteTaskController(req.params.id as string, tasks)))
  }),

  //--------------//

  //get all projects
  rest.get('/projects', (_, res, ctx) => {
    return res(ctx.json(projects))
  }),

  //get project by ID
  rest.get('/projects/:projectId', (req, res, ctx) => {
    return res(
      ctx.json(getProjectById(req.params.projectId as string, projects, tasks))
    )
  }),
]
