import { x, useColor } from '@xstyled/styled-components'
import ContentLoader from 'react-content-loader'
import { useWindowSize } from '@the-planner/hooks'

const ProjectCardSkeleton = ({ ...props }) => {
  const { width } = useWindowSize()
  const primary = useColor('layout-level3accent')

  const adjustment = props.adj || 0

  const w = (width && width - 48 - adjustment) || 400
  const height = 150
  return (
    <x.div backgroundColor="layout-level0accent" borderRadius={3}>
      <ContentLoader
        speed={2}
        width={w}
        height={height}
        viewBox={`0 0 ${w} ${height}`}
        role="skeleton"
        {...props}
        backgroundColor={primary as string}
        uniqueKey="project-card-skeleton"
      >
        <rect
          x="16"
          y="16"
          rx="0"
          ry="0"
          width={w * 0.75 - 8 - 16}
          height={20}
        />

        <rect
          x="16"
          y={16 + 20 + 3}
          rx="0"
          ry="0"
          width={w * 0.5 - 8 - 16}
          height={20}
        />
        <rect
          x="16"
          y={height - 16 - 20}
          rx="0"
          ry="0"
          width={100}
          height={20}
        />

        <rect
          x={w * 0.75}
          y="16"
          rx="100"
          ry="100"
          width={w * 0.25 - 16}
          height={w * 0.25 - 16}
        />
      </ContentLoader>
    </x.div>
  )
}

export default ProjectCardSkeleton
