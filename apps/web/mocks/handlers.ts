import { rest } from 'msw'
import { multipleTasks } from './data/tasks'
import { multipleProjects } from './data/projects'
import { Task, Status, TaskWithProject } from '@the-planner/types'
import { Project } from '@the-planner/types'
import {
  createTaskController,
  deleteTaskController,
  editTaskController,
  getDateTasksController,
  changeTaskStatusController,
  getTaskByIdController,
} from './controllers/taskControllers'
import {
  createProjectController,
  deleteProjectController,
  editProjectController,
  getInfiniteProjects,
  getProjectById,
  getProjectStats,
} from './controllers/projectControllers'
import {
  DefaultRequestBody,
  ResponseComposition,
  ResponseResolver,
  RestContext,
  RestRequest,
} from 'msw'

export type POST<T> = {
  //@ts-ignore
  req: RestRequest<T>
  res: ResponseComposition<DefaultRequestBody>
  ctx: RestContext
}

export type PUT<T> = {
  //@ts-ignore
  req: RestRequest<T>
  res: ResponseComposition<DefaultRequestBody>
  ctx: RestContext
}

export type GET = {
  req: RestRequest
  res: ResponseComposition<DefaultRequestBody>
  ctx: RestContext
}

const initialProjects = multipleProjects()
export const tasks = multipleTasks(initialProjects)

//add tasks ids to projects
export const projects: Project[] = [...initialProjects].map((project) => {
  const addTasks = []

  for (const task of tasks) {
    if (task.projectId === project.id) {
      if (task.status === Status.COMPLETED) {
        addTasks.push(task.status)
      }
    }
  }

  return {
    ...project,
    tasks: addTasks,
  }
})

export const populateTask = (task: Task) => {
  const project = projects.find((project) => task.projectId === project.id)
  if (!project) return task

  return {
    ...task,
    project: {
      title: project.title,
      color: project.color,
    },
  } as TaskWithProject
}

export const countTasksInProject = (project: Project) => {
  let count = 0
  for (const task of tasks) {
    if (task.projectId === project.id) {
      count++
    }
  }

  return count
}

export const handlers = [
  //get date tasks
  rest.get('/tasks', (req, res, ctx) =>
    getDateTasksController({ req, res, ctx }, tasks)
  ),

  //get task by id
  rest.get<Task>('/tasks/:id', (req, res, ctx) =>
    getTaskByIdController({ req, res, ctx }, tasks)
  ),

  //create a task
  rest.post<Task>('/tasks/create', (req, res, ctx) =>
    createTaskController({ req, res, ctx }, tasks, projects)
  ),

  //edit A TASK
  rest.put<Task>('/tasks/:id/edit', (req, res, ctx) =>
    editTaskController({ req, res, ctx }, tasks, projects)
  ),

  //change task status
  rest.put<Task>('/tasks/:id', (req, res, ctx) =>
    changeTaskStatusController({ req, res, ctx }, tasks, projects)
  ),

  //delete a task
  rest.delete('/tasks/:id/delete', (req, res, ctx) =>
    deleteTaskController({ req, res, ctx }, tasks)
  ),

  //--------------//

  //get all projects pagination
  rest.get('/projects', (req, res, ctx) =>
    getInfiniteProjects({ req, res, ctx }, projects)
  ),

  //get recent projects
  rest.get('/projects/recentProjects', (req, res, ctx) =>
    getInfiniteProjects({ req, res, ctx }, projects)
  ),

  //get project by ID
  rest.get('/projects/:projectId', (req, res, ctx) =>
    getProjectById({ req, res, ctx }, projects, tasks)
  ),

  //get project stats
  rest.get('/projects/:projectId/stats', (req, res, ctx) =>
    getProjectStats({ req, res, ctx }, projects, tasks)
  ),

  //create project
  rest.post<Project>('/projects/create', (req, res, ctx) =>
    createProjectController({ req, res, ctx }, projects)
  ),

  //edit project
  rest.put<Project>('/projects/:id/edit', (req, res, ctx) =>
    editProjectController({ req, res, ctx }, projects)
  ),

  //delete project
  rest.delete<Project>('/projects/:id/delete', (req, res, ctx) =>
    deleteProjectController({ req, res, ctx }, projects, tasks)
  ),
]
