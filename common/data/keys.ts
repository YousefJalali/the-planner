const baseURL = '/api'
// const baseURL = ''

export const projectKey = (id: string) => `${baseURL}/projects/${id}`

export const projectsKey = () => `${baseURL}/projects`

//task
export const tasksKey = () => `${baseURL}/tasks`

export const dateTaskKey = (date: Date | string) =>
  `${baseURL}/tasks?d=${new Date(date).toDateString()}`

export const taskKey = (id: string) => `${baseURL}/tasks/${id}`
