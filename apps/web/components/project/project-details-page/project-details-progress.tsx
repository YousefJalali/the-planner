import { LinearProgress } from '@the-planner/ui-web'
import { memo } from 'react'

export const ProjectProgress = memo(
  ({ progress, projectColor }: { projectColor: string; progress: number }) => {
    // return (
    //   <progress
    //     className="progress progress-primary w-full"
    //     value={progress}
    //     max="100"
    //     style={{ backgroundColor: `${projectColor}` }}
    //   ></progress>
    // )
    return <LinearProgress color={projectColor} percentage={progress} />
  }
)

export default ProjectProgress
