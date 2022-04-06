import { FC } from 'react'
import { editTask } from '../../common/actions/taskActions'
import useFetchedDateTasks from '../../common/data/useFetchedDateTasks'
import useFetchedProjects from '../../common/data/useFetchedProjects'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'
import { TaskProjectType, TaskType } from '../../common/types/TaskType'
import FormWithHeader from '../FormWithHeader'
import TaskForm from './TaskForm'
import { useRouter } from 'next/router'
import { ProjectType } from '../../common/types/ProjectType'

type Props = {
  onRequestClose: () => void
  task: TaskType
}

const EditTaskModal: FC<Props> = ({ onRequestClose, task }) => {
  const router = useRouter()

  const { setDateTasks } = useFetchedDateTasks(
    new Date(task.date.startDate).toDateString()
  )

  const { projects } = useFetchedProjects()

  const { project, setProject } = useFetchedProjectById(task.project as string)

  const editTaskHandler = (updatedTask: TaskType) => {
    if (router.query.projectId) {
      setProject((data) => {
        const project = projects.find((p) => p.id === updatedTask.project)
        if (project) {
          return (
            data &&
            ({
              ...data,
              tasks: (data.tasks as TaskType[]).map((t) => {
                return t.id === updatedTask.id ? { ...updatedTask } : t
              }),
            } as ProjectType)
          )
        }
      })
    } else {
      console.log('setDateTasks')
      setDateTasks((data) => {
        const project = projects.find((p) => p.id === updatedTask.project)
        if (project) {
          return (
            data && [
              ...data.map((task) =>
                task.id === updatedTask.id
                  ? {
                      ...updatedTask,
                      project: {
                        id: project.id,
                        title: project.title,
                        color: project.color,
                      },
                    }
                  : task
              ),
            ]
          )
        }
      }, false)
    }

    editTask(updatedTask, () => {
      setDateTasks()
      setProject()
      onRequestClose()
    })
  }

  return (
    <FormWithHeader
      title='Edit task'
      onClose={onRequestClose}
      id='edit-task-form'
    >
      <TaskForm
        id='edit-task-form'
        defaultValues={task}
        onSubmit={editTaskHandler}
      />
    </FormWithHeader>
  )
}

export default EditTaskModal
