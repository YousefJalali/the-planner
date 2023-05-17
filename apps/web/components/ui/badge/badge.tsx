import { Status } from '@the-planner/types'
import { FC } from 'react'

type Props = {
  children: string
  status: Status
  count?: number
  className?: string
}

export const Badge: FC<Props> = ({ children, status, className, count }) => {
  const color =
    status === Status.PROPOSED
      ? '#935aea'
      : status === Status.INPROGRESS
      ? '#ae9900'
      : '#008f20'

  return (
    <div
      className={`font-text badge badge-ghost gap-2 border-0 ${className}`}
      style={{ color, backgroundColor: `${color}30` }}
    >
      {children}
      {typeof count === 'number' && count > 0 && (
        <div
          className="badge badge-ghost badge-xs text-base-100 border-0"
          style={{ backgroundColor: `${color}` }}
        >
          {count}
        </div>
      )}
    </div>
  )
}

export default Badge
