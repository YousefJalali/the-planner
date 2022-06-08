import { x, useColor } from '@xstyled/styled-components'
import ContentLoader from 'react-content-loader'
import useWindowSize from '../../common/hooks/useWindowSize'

const TaskItemSkeleton = ({ ...props }) => {
  const { width } = useWindowSize()
  const bgColor = useColor('layout-level3accent')

  const adjustment = props.adj || 0

  const insidePadding = 8 * 2
  const outsidePadding = 24 * 2

  const w = (width && width - outsidePadding - adjustment) || 400
  const height = 62
  return (
    <x.div backgroundColor='layout-level0accent' borderRadius={2}>
      <ContentLoader
        speed={2}
        width={w}
        height={height}
        viewBox={`0 0 ${w} ${height}`}
        role='skeleton'
        {...props}
        backgroundColor={bgColor as string}
        uniqueKey='task-item-skeleton'
      >
        <rect
          x='8'
          y='8'
          rx='0'
          ry='0'
          width={w - 24 - 12 - 16 - insidePadding}
          height={16}
        />

        <rect x='8' y={8 + 16 + 4 + 8} rx='0' ry='0' width={100} height={16} />

        <rect
          x={8 + 100 + 16}
          y={8 + 16 + 4 + 8}
          rx='0'
          ry='0'
          width={80}
          height={16}
        />

        <rect
          x={w - 24 - 8}
          y={(height - 24) / 2}
          rx='100'
          ry='100'
          width={24}
          height={24}
        />
      </ContentLoader>
    </x.div>
  )
}

export default TaskItemSkeleton
