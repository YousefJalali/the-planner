import { array, boolean, mixed, object, SchemaOf, string } from 'yup'
import { TaskType } from '../../types/TaskType'

const taskSchema: SchemaOf<Omit<TaskType, 'id' | 'status'>> = object({
  title: string().defined().required('Enter a title'),
  description: string().defined().required('Description is required'),
  project: string().required('select a project'),
  isOpen: boolean().defined(),
  startDate: string().defined().required('Start date is required'),
  startTime: string().defined(),
  endDate: string().defined(),
  endTime: string().defined(),
  attachments: array().defined().length(1).required('upload an image'),
})

export default taskSchema
