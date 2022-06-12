import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useModal } from '../common/contexts/ModalCtx'
import useCreateTask from '../common/hooks/task/useCreateTask'
import { TaskType } from '@the-planner/types'
import TaskForm from './task/TaskForm'

const FloatingButton: FC = () => {
  const { setModal, clearModal } = useModal()

  const showForm = (defValues?: Partial<TaskType>, serverErrors?: object) => {
    setModal({
      id: 'task-create',
      fullScreen: true,
      content: (
        <TaskForm
          id="create"
          title="New Task"
          defaultValues={defValues || defaultValues}
          onSubmit={onSubmit}
          serverErrors={serverErrors}
          onRequestClose={() => clearModal('task-create')}
        />
      ),
    })
  }

  const { onSubmit, defaultValues } = useCreateTask(showForm, () =>
    clearModal('task-create')
  )

  return (
    <x.button
      aria-label="floating button"
      name="create task button"
      id="create-task-fb"
      position="fixed"
      bottom="24px"
      right="24px"
      h={48}
      w={48}
      borderRadius="full"
      backgroundColor="brand-primary"
      boxShadow={0}
      zIndex={800}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={() => showForm()}
    >
      <x.div color="layout-level0" fontSize="2rem">
        <FiPlus />
      </x.div>
    </x.button>
  )
}

export default FloatingButton
