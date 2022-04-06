import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiPlus } from 'react-icons/fi'
import useToggle from '../common/hooks/useToggle'
import Icon from './Icon'
import CreateTaskModal from './modals/CreateTaskModal'

const FloatingButton: FC = () => {
  const [createTaskModal, setCreateTaskModal] = useToggle()

  return (
    <>
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
        boxShadow='0px 4px 19px rgba(0, 0, 0, 0.25)'
        zIndex={800}
        display='flex'
        justifyContent='center'
        alignItems='center'
        onClick={setCreateTaskModal}
      >
        <div>
          <Icon icon={FiPlus} size='2rem' color='layout-level0' />
        </div>
      </x.button>

      <CreateTaskModal
        isOpen={createTaskModal}
        onRequestClose={setCreateTaskModal}
      />
    </>
  )
}

export default FloatingButton
