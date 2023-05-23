import Skeleton from 'react-loading-skeleton'

export default function TaskItemSearchPlaceholder() {
  return (
    <div
      data-testid="task-item-search"
      className="relative flex flex-col justify-between pl-6 pb-2 bg-base-100 border border-base-300 rounded-lg h-[96px] overflow-hidden hover:bg-base-300 transition-all"
    >
      <div className="absolute top-2 left-2 w-1 h-[calc(100%-1rem)] rounded-lg" />

      <div>
        <Skeleton width={100} />
        <h3 className={`line-clamp-1 leading-relaxed font-semibold`}>
          <Skeleton width={200} />
        </h3>
      </div>

      <div className="flex justify-between items-center w-[calc(100%-1rem)]">
        <Skeleton width={50} />
        <Skeleton width={50} />
      </div>
    </div>
  )
}
