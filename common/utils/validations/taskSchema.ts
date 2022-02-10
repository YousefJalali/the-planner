import { array, boolean, date, mixed, object, SchemaOf, string } from 'yup'
import { Status, TaskType } from '../../types/TaskType'

// const taskSchema: SchemaOf<Omit<TaskType, 'id' | 'status'>> = object({
const taskSchema: SchemaOf<TaskType> = object({
  id: string().defined(),
  title: string().defined().required('task must have a title'),
  description: string().defined(),
  project: string().required(
    'task must be under a project, select or create a project'
  ),
  openTask: boolean().defined(),
  date: object({
    startDate: date().defined().required('Start date is required'),
    endDate: date().defined().nullable(),
  }).defined(),
  time: object({
    startTime: date().defined().nullable(),
    endTime: date().defined().nullable(),
  }).defined(),
  attachments: array(),
  status: mixed<Status>().oneOf(Object.values(Status)).defined(),
})

export default taskSchema
