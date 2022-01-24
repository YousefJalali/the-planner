import { NestedValue } from 'react-hook-form'
import { ImgType } from '../../components/formElements/ImageInput'

export type TaskFormType = {
  title: string
  project: NestedValue<{
    id: string
    title: string
    color: string
  }>
  isOpen: boolean
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  description: string
  attachments: NestedValue<ImgType[]>
}

// export default TaskFormType
