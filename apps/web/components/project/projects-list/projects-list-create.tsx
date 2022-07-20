import { useModal } from '@the-planner/hooks'
import { x } from '@xstyled/styled-components'
import { FiPlus } from 'react-icons/fi'
import CreateProject from '../CreateProject'

type Props = {
  callback: () => void
}

export const CreateProjectButton = ({ callback }: Props) => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    clearModal('project-list')

    setModal({
      id: 'project-create',
      content: (
        <CreateProject
          onRequestClose={() => {
            clearModal('project-create')
            callback()
          }}
        />
      ),
    })
  }

  return (
    <x.div
      display="flex"
      alignItems="center"
      w="100%"
      p={3}
      position="fixed"
      bottom="0"
      backgroundColor="layout-level0"
      onClick={clickHandler}
      borderTop="1px solid"
      borderColor="layout-level0accent"
    >
      <x.span
        text="body"
        color="brand-primary"
        display="flex"
        alignItems="center"
      >
        <FiPlus />
        <x.span ml={1}>Create Project</x.span>
      </x.span>
    </x.div>
  )
}

export default CreateProjectButton
