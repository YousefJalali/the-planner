import { useMemo } from 'react'
import { ProjectType } from '@the-planner/types'
import { Button } from '@the-planner/ui-web'
import { FC } from 'react'
import { useProjectEditModal } from '../../modals'

type Props = {
  project: ProjectType
}

export const EditProject: FC<Props> = ({ project }) => {
  const { showModal } = useProjectEditModal(project)

  return useMemo(
    () => (
      <Button
        name="edit project"
        variant="textOnly"
        color="information"
        onClick={showModal}
        mr="calc(24px - 0.5rem)"
      >
        Edit
      </Button>
    ),
    [showModal]
  )
}

export default EditProject
