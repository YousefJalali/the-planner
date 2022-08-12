import { useCreateProject } from '@the-planner/data'
import { Button } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useProjectCreateModal } from '../../modals'

const NewProject = () => {
  const { onSubmit } = useCreateProject()
  const { showModal } = useProjectCreateModal({ onSubmit })

  return useMemo(
    () => (
      <Button
        name="create project"
        variant="outline"
        onClick={showModal}
        mr={4}
        borderColor="layout-level0accent"
        borderRadius="full"
        p={1}
      >
        <x.span fontSize="1.5rem" color="content-contrast">
          <FiPlus />
        </x.span>
      </Button>
    ),
    [showModal]
  )
}

export default NewProject
