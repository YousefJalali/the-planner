import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import { RadioButton } from '@the-planner/ui-web'
import { useUpdateTaskStatus } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'

type Props = {
  status: Status
  taskId: string
}

const StatusList: FC<Props> = ({ status, taskId }) => {
  const { clearModal } = useModal()

  const { taskStatusHandler } = useUpdateTaskStatus({
    callback: () => {
      clearModal('task-status')
      clearModal('task-options')
    },
  })

  const changeHandler = (newStatus: Status) =>
    taskStatusHandler({ taskId, newStatus })

  return (
    <x.ul my={1} divideY divideColor="layout-level0accent">
      {Object.values(Status).map((val) => (
        <x.li key={Status[val]} display="flex" alignItems="center">
          <RadioButton
            name="status"
            label={statusAlias(Status[val])}
            value={Status[val]}
            id={Status[val]}
            checked={status === Status[val]}
            onChange={() => changeHandler(Status[val])}
          />
        </x.li>
      ))}
    </x.ul>
  )
}

export default StatusList
