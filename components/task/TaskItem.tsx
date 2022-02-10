import { FC } from 'react'
import Task from '../../styles/components/task/TaskItemStyle'
import { TaskType, TaskProjectType, Status } from '../../common/types/TaskType'
import { Paperclip, Clock, Trash2, Edit3, Check } from 'lucide-react'
import { Box, Body, Text } from '../../styles'
import { getTime } from '../../common/utils/formatDate'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import TaskDetails from './TaskDetails'
import Modal from '../layout/Modal'
import useToggle from '../../common/hooks/useToggle'

type Props = {
  task: TaskType
  onCheck: () => void
}

const TaskItem: FC<Props> = ({ task, onCheck }) => {
  const [modal, setModal] = useToggle()
  //format time
  let time = null

  if (!task.openTask && task.time.startTime && task.time.endTime) {
    const startTime = getTime(task.time.startTime)
    const endTime = getTime(task.time.endTime)

    time = `${startTime} - ${endTime}`
  }

  //format attachment
  const attachment =
    task.attachments.length > 1
      ? `${task.attachments.length} Files`
      : `${task.attachments.length} File`

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
      {/* <Task.Container as={animated.li} {...bind()} style={{ x }}> */}
      <Task.Container>
        {/* <Task.Cta>
          <div>
            <Trash2 height={20} width={20} />
          </div>
          <div>
            <Edit3 height={20} width={20} />
          </div>
        </Task.Cta> */}

        <Task.Content>
          <Task.Info completed={task.status === Status.COMPLETED}>
            <Body onClick={setModal}>
              {task.title}
              {/* {new Date(task.startDate).toDateString()} */}
            </Body>

            <Task.Details>
              {time && (
                <Box display='flex' alignItems='center' mr={2} mt={1}>
                  <Clock height={14} width={14} data-testid='taskItem-time' />
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
                  <Paperclip
                    height={14}
                    width={14}
                    data-testid='taskItem-attachment'
                  />
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
          <Task.Check color={(task.project as TaskProjectType).color}>
            <input
              id={task.id}
              type='checkbox'
              checked={task.status === Status.COMPLETED}
              onChange={onCheck}
            />
            <Task.CheckButton
              color={(task.project as TaskProjectType).color}
              as='label'
              htmlFor={task.id}
            >
              <Check height={12} width={12} />
            </Task.CheckButton>
            {/* <label htmlFor={task.id}></label> */}
          </Task.Check>
        </Task.Content>
      </Task.Container>

      <Modal isOpen={modal} onRequestClose={setModal}>
        <TaskDetails task={task} onClose={setModal} />
      </Modal>
    </>
  )
}

export default TaskItem
