import { useModal } from '@the-planner/hooks'
import { TaskWithProjectType } from '@the-planner/types'
import { x } from '@xstyled/styled-components'
import { TaskDetails } from '../../task-details'

type Props = {
  task: TaskWithProjectType
}

export const Link = ({ task }: Props) => {
  const { setModal, clearModal } = useModal()

  const onClick = () => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

  return (
    <x.a
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      onClick={onClick}
      userSelect="none"
      cursor="pointer"
    />
  )
}

export default Link
