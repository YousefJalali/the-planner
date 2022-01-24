import { FC } from 'react'
import Task from '../../styles/components/task/TaskItemStyle'
import { TaskType } from '../../common/types/TaskType'
import { Paperclip, Clock, Trash2, Edit3, Check } from 'lucide-react'
import { Box, Body, Text } from '../../styles'
import formatDate from '../../common/utils/formatDate'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import TaskDetails from './TaskDetails'
import Modal from '../layout/Modal'
import useToggle from '../../common/hooks/useToggle'

type Props = {
  task: TaskType
}

const TaskItem: FC<Props> = ({ task }) => {
  const [modal, setModal] = useToggle()
  //format time
  let time = ''
  if (!task.isOpen) {
    const [, startTime] = formatDate(task.startTime)
    const [, endTime] = formatDate(task.endTime)
    time = `${startTime} - ${endTime}`
  }

  //format attachment
  const attachment =
    task.attachments.length > 1
      ? `${task.attachments.length} Files`
      : `${task.attachments.length} File`

  const onCheckHandler = () => {
    console.log('ha')
  }

  //spring
  const [{ x }, api] = useSpring(() => ({
    x: 0,
  }))
  const bind = useDrag(({ active, movement: [x] }) =>
    api.start({
      x: active ? x : 0,
    })
  )

  return (
    <>
      <Task.Container as={animated.li} {...bind()} style={{ x }}>
        <Task.Cta>
          <div>
            <Trash2 height={20} width={20} />
          </div>
          <div>
            <Edit3 height={20} width={20} />
          </div>
        </Task.Cta>

        <Task.Content onClick={setModal}>
          <Task.Info completed={task.status === 'completed'}>
            <Body size='large'>{task.title}</Body>

            <Task.Details>
              {!task.isOpen && (
                <Box display='flex' alignItems='center' mr={2} mt={1}>
                  <Clock height={14} width={14} />
                  <Text
                    as='span'
                    ml={0}
                    color='content.nonessential'
                    fontSize={1}
                  >
                    {time}
                  </Text>
                </Box>
              )}
              {task.attachments.length > 0 && (
                <Box display='flex' alignItems='center' mt={1}>
                  <Paperclip height={14} width={14} />
                  <Text
                    as='span'
                    ml={0}
                    color='content.nonessential'
                    fontSize={1}
                  >
                    {attachment}
                  </Text>
                </Box>
              )}
            </Task.Details>
          </Task.Info>
          <Task.Check color={task.project.color}>
            <input
              type='radio'
              checked={task.status === 'completed'}
              onChange={onCheckHandler}
            />
            <Task.CheckButton color={task.project.color}>
              <Check height={12} width={12} />
            </Task.CheckButton>
            <label htmlFor={task.id}></label>
          </Task.Check>
        </Task.Content>
      </Task.Container>

      {modal && (
        <Modal onClose={setModal}>
          <TaskDetails task={task} onClose={setModal} />
        </Modal>
      )}
    </>
  )
}

export default TaskItem
