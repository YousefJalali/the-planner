import { useEditProject } from '@the-planner/data'
import { ProjectType } from '@the-planner/types'
import { x } from '@xstyled/styled-components'
import { memo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useProjectCreateModal, useProjectsListModal } from '../../modals'

type Props = {
  onSelectProject: (project: ProjectType) => void
}

export const CreateProjectButton = memo(({ onSelectProject }: Props) => {
  const { showModal: showProjectsListModal } =
    useProjectsListModal(onSelectProject)

  const { onSubmit } = useEditProject(() => {
    clearModal('project-create')
    showProjectsListModal()
  })

  const { showModal, clearModal } = useProjectCreateModal({ onSubmit })

  const clickHandler = () => {
    clearModal('project-list')
    showModal()
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
})

export default CreateProjectButton
