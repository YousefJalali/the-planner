import { Spinner } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
  children: JSX.Element | JSX.Element[]
  dataLength: number
  next: () => void
  hasMore: boolean
}
export const DynamicFlatList = ({
  children,
  dataLength,
  next,
  hasMore,
}: Props) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={
        <x.div display="flex" justifyContent="center" py={3}>
          <Spinner pathColor="brand-primary" trailColor="layout-level0accent" />
        </x.div>
      }
    >
      <x.ul pb={3} spaceY={4}>
        {children}
      </x.ul>
    </InfiniteScroll>
  )
}

export default DynamicFlatList
