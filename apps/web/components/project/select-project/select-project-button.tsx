import { Project } from '@the-planner/types'
import { useProjectsListModal } from '../../modals'

type Props = {
  id: string
  onSelectProject: (project: Project) => void
}

const SelectButton = ({ id, onSelectProject }: Props) => {
  const { showModal, clearModal } = useProjectsListModal((project) => {
    onSelectProject(project)
    clearModal('project-list')
  })

  return (
    <button
      id={id}
      type="button"
      onClick={showModal}
      className="absolute top-0 left-0 w-full h-full"
    />
  )
}

export default SelectButton
