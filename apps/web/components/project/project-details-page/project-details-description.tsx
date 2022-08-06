import { TextEditor } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { memo } from 'react'

export const ProjectDescription = memo(
  ({ description }: { description: string }) => (
    <>
      {description?.length > 0 && (
        <x.div mb={3} maxHeight="128px" overflowY="scroll">
          <TextEditor value={description} readOnly />
        </x.div>
      )}
    </>
  )
)

export default ProjectDescription
