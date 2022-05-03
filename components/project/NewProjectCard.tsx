import { x } from '@xstyled/styled-components'
import { FiPlus } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import NoProject from '../../styles/illustrations/NoProject'
import Button from '../formElements/Button'
import CreateProject from './CreateProject'

const NewProjectCard = () => {
  const { setModal, clearModal } = useModal()

  const showCreateProjectModal = () => {
    setModal({
      id: 'project-create',
      content: (
        <CreateProject onRequestClose={() => clearModal('project-create')} />
      ),
    })
  }

  return (
    <x.div
      display='flex'
      justifyContent='space-between'
      position='relative'
      overflow='hidden'
      // backgroundColor='layout-level0accent'
      border='1px solid'
      borderColor='layout-divider'
      p={3}
      borderRadius={3}
    >
      <x.div
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <x.div mb={4}>
          <x.span color='content-contrast' text='body.default' display='block'>
            No active projects
          </x.span>
          <x.span color='content-subtle' text='body.small'>
            Create your first project now
          </x.span>
        </x.div>

        <Button
          name='new project'
          variant='outline'
          size='small'
          w='fit-content'
          onClick={showCreateProjectModal}
        >
          <>
            <x.span text='body.large' mr={1}>
              <FiPlus />
            </x.span>
            <x.span text='body.small'>New Project</x.span>
          </>
        </Button>
      </x.div>

      <x.div
        position='absolute'
        top='70%'
        right='-50%'
        transform
        translateY='-50%'
        rotate={36}
        w='120%'
        h='120%'
      >
        <NoProject />
      </x.div>
    </x.div>
  )
}

export default NewProjectCard
