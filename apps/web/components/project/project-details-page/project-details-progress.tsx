import { LinearProgress } from '@the-planner/ui-web'
import { memo } from 'react'

export const ProjectProgress = memo(
  ({ progress, projectColor }: { projectColor: string; progress: number }) => {
    return <LinearProgress color={projectColor} percentage={progress} />
  }
)

export default ProjectProgress
