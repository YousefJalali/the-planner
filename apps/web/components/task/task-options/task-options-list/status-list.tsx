import { FC, useCallback } from 'react'
import { Status } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import { useUpdateTaskStatus } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'

type Props = {
  status: Status
  taskId: string
}

const StatusList: FC<Props> = ({ status, taskId }) => {
  const { setModal, clearModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-status',
        content: <StatusList taskId={taskId} status={status} />,
      }),
    [taskId, status]
  )

  const { taskStatusHandler } = useUpdateTaskStatus({
    callback: () => {
      clearModal('task-status')
      clearModal('task-options')
    },
  })

  const changeHandler = (newStatus: Status) =>
    taskStatusHandler({ taskId, newStatus })

  return (
    <ul className="my-1 divide-y divide-base-200 w-screen">
      {Object.values(Status).map((val) => (
        <li key={Status[val]} className="flex items-center">
          <div className="form-control w-full">
            <label className="label cursor-pointer flex-row-reverse justify-end gap-2 p-4 hover:bg-base-200 transition-all">
              <span className="">{statusAlias(Status[val])}</span>
              <input
                type="radio"
                className="radio radio-primary"
                name="status"
                value={Status[val]}
                id={Status[val]}
                checked={status === Status[val]}
                onChange={() => changeHandler(Status[val])}
              />
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default StatusList
