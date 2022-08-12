import { useCreateProject } from '@the-planner/data'
import { Button } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { useProjectCreateModal } from 'apps/web/components/modals'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

const NewProject = () => {
  const { onSubmit } = useCreateProject()
  const { showModal } = useProjectCreateModal({ onSubmit })

  return useMemo(
    () => (
      <Button
        name="new project"
        variant="outline"
        size="small"
        w="fit-content"
        onClick={showModal}
      >
        <>
          <x.span text="body.large" mr={1}>
            <FiPlus />
          </x.span>
          <x.span text="body.small">New Project</x.span>
        </>
      </Button>
    ),
    [showModal]
  )
}

export default NewProject
