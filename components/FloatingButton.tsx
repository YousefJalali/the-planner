import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useModal } from '../common/contexts/ModalCtx'
import CreateTask from './task/CreateTask'

const FloatingButton: FC = () => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    setModal({
      id: 'task-create',
      fullScreen: true,
      content: <CreateTask onRequestClose={() => clearModal('task-create')} />,
    })
  }

  return (
    <x.button
      aria-label='floating button'
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
