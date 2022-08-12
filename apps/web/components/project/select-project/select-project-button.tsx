import { ProjectType } from '@the-planner/types'
import { x } from '@xstyled/styled-components'
import { useProjectsListModal } from '../../modals'

type Props = {
  id: string
  onSelectProject: (project: ProjectType) => void
}

const SelectButton = ({ id, onSelectProject }: Props) => {
  const { showModal, clearModal } = useProjectsListModal((project) => {
    onSelectProject(project)
    clearModal('project-list')
  })

  return (
    <x.button
      id={id}
      type="button"
      onClick={showModal}
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      backgroundColor="transparent"
    />
  )
}

export default SelectButton
