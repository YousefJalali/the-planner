import { FC } from 'react'

type Props = {
  percentage: number
  color: string
}

export const LinearProgress: FC<Props> = ({ color, percentage }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <span className="text-sm opacity-60">Progress</span>
        <span className="text-sm opacity-60">{percentage}%</span>
      </div>

      <div
        className="w-full h-2 rounded-lg overflow-hidden relative"
        style={{ backgroundColor: `${color}20` }}
      >
        {new Array(5)
          .fill(0)
          .map((ele, i) =>
            i === 4 || i === 0 ? null : (
              <div
                key={i}
                className="absolute top-0 h-full w-1 bg-base-100 z-10"
                style={{ left: `${(100 * i) / 4}%` }}
              />
            )
          )}

        <div
          className="h-full w-full absolute top-0 transform transition-all"
          style={{
            backgroundColor: color,
            // transform: `translateX(${-90}%)`,
            transform: `translateX(${-100 + percentage}%)`,
          }}
        ></div>
      </div>
    </div>
  )
}
