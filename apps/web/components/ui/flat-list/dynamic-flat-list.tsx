import { Spinner } from '../'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
  children: JSX.Element | JSX.Element[]
  dataLength: number
  next: () => void
  hasMore: boolean
  className?: string
}
export const DynamicFlatList = ({
  children,
  dataLength,
  next,
  hasMore,
  className,
}: Props) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-3 md:hidden">
          <Spinner />
        </div>
      }
      className={className}
    >
      {children}
    </InfiniteScroll>
  )
}

export default DynamicFlatList
