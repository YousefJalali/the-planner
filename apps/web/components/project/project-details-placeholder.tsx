import { useWindowSize } from '@the-planner/hooks'
import Skeleton from 'react-loading-skeleton'

export default function ProjectDetailsPlaceholder() {
  const { width } = useWindowSize()
  return (
    <section className="overflow-hidden px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold leading-relaxed">
          <Skeleton width={300} />
        </h1>
        <Skeleton width={100} height={30} />
      </div>

      {/* {project.description?.length > 0 && (
      <div className="mb-4 max-h-[128px] overflow-y-scroll">
        <p>{project.description}</p>
      </div>
    )} */}

      <div className="h-[36px]">
        <Skeleton width={100} height={16} />
        <Skeleton width={width} height={16} />
      </div>
      {/* <LinearProgress color={project.color} percentage={progress} /> */}
    </section>
  )
}
