import Skeleton from 'react-loading-skeleton'

export default function TaskItemPlaceholder() {
  return (
    <div
      data-testid="task-item-placeholder"
      className="relative bg-base-200 rounded-lg hover:bg-base-300 transition-all h-fit"
    >
      <div className="flex justify-between items-center">
        <div
          data-testid="taskItem-details"
          className="relative flex flex-col pr-1 flex-1 p-2"
        >
          <h3 className={`font-text line-clamp-2 leading-relaxed`}>
            <Skeleton width={150} />
          </h3>

          <div className="flex gap-x-3 flex-wrap">
            <Skeleton width={100} />
          </div>
        </div>

        <div className="flex gap-1 items-center p-2">
          <Skeleton width={25} />
        </div>
      </div>
    </div>
  )
}
