import Skeleton from 'react-loading-skeleton'

export default function ProjectCardPlaceholder() {
  return (
    <div className="w-full h-[150px] p-4 flex gap-4 justify-between rounded-xl min-w-[300px] bg-base-200 border border-base-300">
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl font-semibold">
          <Skeleton width={150} className="text-primary" />
        </h1>
        <p className="mt-4 text-sm opacity-60">
          <Skeleton width={75} />
        </p>
      </div>

      <div
        className="radial-progress aspect-square text-base-300"
        //@ts-ignore
        style={{ '--value': 100 }}
      >
        <Skeleton width={30} />
      </div>
    </div>
  )
}
