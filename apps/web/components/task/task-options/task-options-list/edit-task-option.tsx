import { useEditTask } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { Task } from '@the-planner/types'
import { ModalHeader } from '@the-planner/ui-web'
import { FiEdit3 } from 'react-icons/fi'
import { TaskForm } from '../../task-form'
import TaskOption from './task-option-item'

type Props = {
  task: Task
}

const EditTaskOption = ({ task }: Props) => {
  const { setModal, clearModal } = useModal()

  const showTaskForm = (defValues?: Partial<Task>, serverErrors?: object) => {
    setModal({
      id: 'task-edit',
      fullScreen: true,
      content: (
        <>
          <ModalHeader
            onRequestClose={() => {
              clearModal('task-edit')
              clearModal('task-options')
            }}
            p={3}
          >
            Edit Task
          </ModalHeader>
          <TaskForm
            id="edit"
            defaultValues={defValues || task}
            onSubmit={onSubmit}
            serverErrors={serverErrors}
          />
        </>
      ),
    })
  }

  const { onSubmit } = useEditTask(showTaskForm, () => {
    clearModal('task-edit')
    clearModal('task-options')
  })

  const onEdit = () => {
    clearModal('task-options')
    showTaskForm()
  }

  return (
    <TaskOption
      data-testid="edit-task-option"
      onClick={onEdit}
      icon={<FiEdit3 />}
      content="Edit task"
    />
  )
}

export default EditTaskOption
