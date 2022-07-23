import { x, useColor } from '@xstyled/styled-components'
import ContentLoader from 'react-content-loader'

export const TagSkeleton = ({ ...props }) => {
  const bgColor = useColor('layout-level3accent')

  const w = 64
  const height = 18.3
  return (
    <x.div borderRadius={2}>
      <ContentLoader
        speed={2}
        width={w}
        height={height}
        viewBox={`0 0 ${w} ${height}`}
        role="skeleton"
        {...props}
        backgroundColor={bgColor as string}
        uniqueKey="tag-skeleton"
      >
        <rect x="0" y="0" rx="4" ry="4" width={w} height={height} />
      </ContentLoader>
    </x.div>
  )
}

export default TagSkeleton
