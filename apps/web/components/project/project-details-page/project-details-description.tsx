import { memo } from 'react'

export const ProjectDescription = memo(
  ({ description }: { description: string }) => (
    <>
      {description?.length > 0 && (
        <div className="mb-4 max-h-[128px] overflow-y-scroll">
          <p>{description}</p>
        </div>
      )}
    </>
  )
)

export default ProjectDescription
