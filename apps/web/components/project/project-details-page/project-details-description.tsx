import { TextEditor } from '@the-planner/ui-web'
import { memo } from 'react'

export const ProjectDescription = memo(
  ({ description }: { description: string }) => (
    <>
      {description?.length > 0 && (
        <div className="mb-4 max-h-[128px] overflow-y-scroll">
          <TextEditor value={description} readOnly />
        </div>
      )}
    </>
  )
)

export default ProjectDescription
