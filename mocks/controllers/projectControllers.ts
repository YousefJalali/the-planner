import { ProjectType } from '../../common/types/ProjectType'
import { TaskType } from '../../common/types/TaskType'

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
