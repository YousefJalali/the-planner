import { SkeletonList, TaskItemSkeleton } from '../skeletons/'

const SearchLoading = () => {
  return <SkeletonList component={<TaskItemSkeleton />} />
}

export default SearchLoading
