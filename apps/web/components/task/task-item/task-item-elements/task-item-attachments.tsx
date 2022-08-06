import { ImageType, Status } from '@the-planner/types'
import { memo } from 'react'
import { FiPaperclip } from 'react-icons/fi'
import Details from './task-item-details'

type Props = {
  status: Status
  attachments: ImageType[]
}

export const Attachments = ({ attachments, status }: Props) => {
  const isTaskCompleted = status === Status.COMPLETED

  //format attachment
  const attachment =
    attachments.length > 1
      ? `${attachments.length} Files`
      : `${attachments.length} File`

  return attachments.length > 0 ? (
    <Details
      data-testid="taskItem-attachment"
      isTaskCompleted={isTaskCompleted}
      icon={<FiPaperclip />}
    >
      {attachment}
    </Details>
  ) : null
}

export default Attachments
