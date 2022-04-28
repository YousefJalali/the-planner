import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import Tag from './Tag'
import TasksList from './TasksList'

type Props = {
  tasks: TaskWithProjectType[]
}

const TasksLists: FC<Props> = ({ tasks }) => {
  let inProgressTasks = null
  let proposedTasks = null
  let completedTasks = null

  if (tasks) {
    inProgressTasks = tasks.filter((task) => task.status === Status.INPROGRESS)
    proposedTasks = tasks.filter((task) => task.status === Status.PROPOSED)
    completedTasks = tasks.filter((task) => task.status === Status.COMPLETED)
  }

  return (
    <>
      {inProgressTasks && inProgressTasks.length > 0 ? (
        <x.div pb={4}>
          <Tag textOnly variant={Status.INPROGRESS} />

          <TasksList
            id={`${Status.INPROGRESS}-tasks-list`}
            tasks={inProgressTasks}
          />
        </x.div>
      ) : null}

      {proposedTasks && proposedTasks.length > 0 ? (
        <x.div pb={4}>
          <Tag textOnly variant={Status.PROPOSED} />
          <TasksList
            id={`${Status.PROPOSED}-tasks-list`}
            tasks={proposedTasks}
          />
        </x.div>
      ) : null}

      {completedTasks && completedTasks.length > 0 ? (
        <x.div pb={4}>
          <Tag textOnly variant={Status.COMPLETED} />
          <TasksList
            id={`${Status.COMPLETED}-tasks-list`}
            tasks={completedTasks}
          />
        </x.div>
      ) : null}
    </>
  )
}

export default TasksLists
