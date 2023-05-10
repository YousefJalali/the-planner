import { Spinner } from '../'
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
        <div className="flex justify-center py-3">
          <Spinner />
        </div>
      }
    >
      <ul className="pb-3 space-y-4">{children}</ul>
    </InfiniteScroll>
  )
}

export default DynamicFlatList
