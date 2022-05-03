import { FC } from 'react'
import { x } from '@xstyled/styled-components'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import { TaskWithProjectType } from '../../common/types/TaskType'

import TaskItem from './TaskItem'

import useCheckTask from '../../common/hooks/task/useCheckTask'
import { useModal } from '../../common/contexts/ModalCtx'
import TaskDetails from './TaskDetails'
import TaskOptions from './TaskOptions'
import useWindowSize from '../../common/hooks/useWindowSize'

type Props = {
  tasks: TaskWithProjectType[]
  id?: string
}

const TasksList: FC<Props> = ({ tasks, id }) => {
  const { width } = useWindowSize()
  const { setModal, clearModal } = useModal()

  const { checkTaskHandler } = useCheckTask()

  const onDetails = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <x.ul spaceY={3} id={id} data-testid={id}>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li {...animations} key={task.id}>
            <TaskItem
              task={task}
              onCheck={checkTaskHandler}
              onDetails={() => onDetails(task)}
              options={<TaskOptions task={task} callLocation='taskId' />}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </x.ul>
  )
}

export default TasksList
