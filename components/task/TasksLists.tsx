import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import Tag from './Tag'
import TasksList from './TasksList'

const List = ({
  status,
  tasks,
}: {
  status: Status
  tasks: TaskWithProjectType[]
}) => (
  <x.div pb={4}>
    <Tag textOnly variant={status} />

    <TasksList id={`${status}-tasks-list`} tasks={tasks} />
  </x.div>
)

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
        <List status={Status.INPROGRESS} tasks={inProgressTasks} />
      ) : null}

      {proposedTasks && proposedTasks.length > 0 ? (
        <List status={Status.PROPOSED} tasks={proposedTasks} />
      ) : null}

      {completedTasks && completedTasks.length > 0 ? (
        <List status={Status.COMPLETED} tasks={completedTasks} />
      ) : null}
    </>
  )
}

export default TasksLists
