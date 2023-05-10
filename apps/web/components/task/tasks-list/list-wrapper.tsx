import { Status } from '@the-planner/types'
import { Badge } from '../../ui'
import { statusAlias } from '@the-planner/utils'

type Props = {
  children: JSX.Element | JSX.Element[]
  withDivider?: boolean
  status: Status
  count: number
}

const ListWrapper = ({
  children,
  withDivider = false,
  status,
  count,
}: Props) => {
  const color =
    status === Status.PROPOSED
      ? '#935aea'
      : status === Status.INPROGRESS
      ? '#ae9900'
      : '#008f20'

  return (
    <div
      className={`${withDivider ? `rounded-lg p-2 h-fit` : 'pb-6'}`}
      style={{ backgroundColor: withDivider ? `${color}20` : undefined }}
    >
      <Badge status={status} count={count} className="mb-2">
        {statusAlias(status)}
      </Badge>

      {children}
    </div>
  )
}

export default ListWrapper
