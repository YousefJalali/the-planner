import { FC } from 'react'
import { x } from '@xstyled/styled-components'
import { TaskType, TaskProjectType, Status } from '../../common/types/TaskType'
import { getTime } from '../../common/utils/formatDate'
import TaskDetails from './TaskDetails'
import Modal from '../layout/Modal'
import useToggle from '../../common/hooks/useToggle'
import { FiPaperclip, FiClock, FiMoreVertical } from 'react-icons/fi'
import Icon from '../Icon'
import Checkbox from '../formElements/Checkbox'
import FormWithHeader from '../FormWithHeader'
import TaskForm from './TaskForm'
import TaskOptions from './TaskOptions'

type Props = {
  task: TaskType
  onDelete: () => void
  onEdit: (data: TaskType) => void
  onChangeStatus: (taskIs: string, status: Status) => void
}

const TaskItem: FC<Props> = ({ task, onDelete, onEdit, onChangeStatus }) => {
  const [detailsModal, setDetailsModal] = useToggle()
  const [optionsModal, setOptionsModal] = useToggle()
  const [editTaskModal, setEditTaskModal] = useToggle()

  const onDeleteHandler = () => {
    onDelete()
    setOptionsModal()
  }

  const onEditHandler = (data: TaskType) => {
    onEdit(data)
    setEditTaskModal()
    setOptionsModal()
  }

  const onCheckHandler = () => {
    const s =
      task.status === Status.PROPOSED || task.status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    onChangeStatus(task.id, s)
  }

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

  const isTaskCompleted = task.status === Status.COMPLETED

  return (
    <>
      <x.div
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        position='relative'
        p={2}
        backgroundColor='layout-level0accent'
        borderRadius={2}
      >
        <x.div
          display='flex'
          flexDirection='column'
          flex='0 0 calc(100% - 24px - 12px - 16px)'
        >
          {/* Title text */}
          <x.p
            text='body'
            textDecoration={isTaskCompleted && 'line-through'}
            color={
              isTaskCompleted ? 'content-nonessential' : 'content.contrast'
            }
            onClick={setDetailsModal}
          >
            {task.title}
          </x.p>

          {/* time & attachments */}
          <x.div display='flex'>
            {time && (
              <x.div
                display='flex'
                alignItems='center'
                mr={3}
                mt={2}
                data-testid='taskItem-time'
              >
                <Icon
                  icon={FiClock}
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  size='0.875rem'
                />
                <x.span
                  text='body.small'
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  ml={1}
                >
                  {time}
                </x.span>
              </x.div>
            )}

            {task.attachments.length > 0 && (
              <x.div
                display='flex'
                alignItems='center'
                mt={2}
                data-testid='taskItem-attachment'
              >
                <Icon
                  icon={FiPaperclip}
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  size='0.875rem'
                />

                <x.span
                  text='body.small'
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  ml={1}
                >
                  {attachment}
                </x.span>
              </x.div>
            )}
          </x.div>
        </x.div>

        {/* check button */}
        <Checkbox
          id={task.id}
          checked={task.status === Status.COMPLETED}
          onChange={onCheckHandler}
          color={(task.project as TaskProjectType).color}
        />

        <x.div onClick={setOptionsModal}>
          <Icon icon={FiMoreVertical} color='content-subtle' />
        </x.div>
      </x.div>

      <Modal isOpen={detailsModal} onRequestClose={setDetailsModal}>
        <TaskDetails task={task} onClose={setDetailsModal} />
      </Modal>

      <Modal isOpen={optionsModal} onRequestClose={setOptionsModal}>
        <TaskOptions
          status={task.status}
          onEdit={setEditTaskModal}
          onDelete={onDeleteHandler}
          onStatusChange={(status) => onChangeStatus(task.id, status)}
        />
      </Modal>

      <Modal isOpen={editTaskModal} onRequestClose={setEditTaskModal}>
        <FormWithHeader
          title='Edit task'
          onClose={setEditTaskModal}
          id='edit-task-form'
        >
          <TaskForm
            id='edit-task-form'
            defaultValues={task}
            onSubmit={onEditHandler}
          />
        </FormWithHeader>
      </Modal>
    </>
  )
}

export default TaskItem
