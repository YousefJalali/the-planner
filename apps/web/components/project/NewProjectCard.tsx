import { x } from '@xstyled/styled-components'
import { FiPlus } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import { Button, NoProjectSvg } from '@the-planner/ui-web'
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
      position="relative"
      display="flex"
      justifyContent="space-between"
      overflow="hidden"
      backgroundColor="layout-level0accent"
      p={3}
      borderRadius={3}
      minHeight={150}
    >
      <x.div
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <x.div mb={4}>
          <x.span
            color="content-contrast"
            text="body.large"
            fontWeight="medium"
            display="block"
          >
            No active projects
          </x.span>
          <x.span color="content-default" text="body.small">
            Create your first project now
          </x.span>
        </x.div>

        <Button
          name="new project"
          variant="outline"
          size="small"
          w="fit-content"
          onClick={showCreateProjectModal}
        >
          <>
            <x.span text="body.large" mr={1}>
              <FiPlus />
            </x.span>
            <x.span text="body.small">New Project</x.span>
          </>
        </Button>
      </x.div>

      <x.div
        position="absolute"
        top="70%"
        right="-50%"
        transform
        translateY="-50%"
        rotate={36}
        w="120%"
        h="120%"
      >
        <NoProjectSvg />
      </x.div>
    </x.div>
  )
}

export default NewProjectCard
