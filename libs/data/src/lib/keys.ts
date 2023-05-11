const baseURL = '/api'
// const baseURL = ''

export const projectsKey = () => `${baseURL}/projects`

//task
export const tasksKey = () => `${baseURL}/tasks`

export const dateTasksKey = (date: Date | string) =>
  `${baseURL}/tasks?d=${date}`

export const taskKey = (id: string) => `${baseURL}/tasks/${id}`
