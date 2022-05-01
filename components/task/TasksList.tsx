import { FC } from 'react'
import { x } from '@xstyled/styled-components'

import { TaskWithProjectType } from '../../common/types/TaskType'

import TaskItem from './TaskItem'

import useCheckTask from '../../common/hooks/task/useCheckTask'
import { useModal } from '../../common/contexts/ModalCtx'
import TaskDetails from './TaskDetails'
import TaskOptions from './TaskOptions'

type Props = {
  tasks: TaskWithProjectType[]
  id?: string
}

const TasksList: FC<Props> = ({ tasks, id }) => {
  const { setModal, clearModal } = useModal()
  //hooks
  const { checkTaskHandler } = useCheckTask()

  const onDetails = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

  return (
    <x.ul spaceY={3} id={id} data-testid={id}>
      {tasks.map((task) => (
        <x.li key={task.id}>
          <TaskItem
            task={task}
            onCheck={checkTaskHandler}
            onDetails={() => onDetails(task)}
            options={<TaskOptions task={task} callLocation='taskId' />}
          />
        </x.li>
      ))}
    </x.ul>
  )
}

export default TasksList
