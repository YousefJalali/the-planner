import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useModal } from '../common/contexts/ModalCtx'
import useCreateTask from '../common/hooks/task/useCreateTask'
import TaskForm from './task/TaskForm'

const FloatingButton: FC = () => {
  const { setModal, clearModal } = useModal()
  const { isSubmitting, onSubmit, defaultValues } = useCreateTask(() =>
    clearModal('task-create')
  )

  const clickHandler = () => {
    setModal({
      id: 'task-create',
      content: (
        <TaskForm
          id='create'
          title='New Task'
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      ),
    })
  }

  return (
    <x.button
      name='create task button'
      id='create-task-fb'
      position='fixed'
      bottom='24px'
      right='24px'
      h={48}
      w={48}
      borderRadius='full'
      backgroundColor='brand-primary'
      boxShadow={0}
      zIndex={800}
      display='flex'
      justifyContent='center'
      alignItems='center'
      onClick={clickHandler}
    >
      <x.div color='layout-level0' fontSize='2rem'>
        <FiPlus />
      </x.div>
    </x.button>
  )
}

export default FloatingButton
