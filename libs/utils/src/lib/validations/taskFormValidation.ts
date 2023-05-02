import { array, boolean, date, mixed, object, Schema, string } from 'yup'
import { Attachment, Status, Task } from '@the-planner/types'

// const taskSchema: SchemaOf<Omit<Task, 'id' | 'status'>> = object({
export const taskFormValidation: Schema<Task> = object({
  id: string().defined(),
  title: string().defined().required('task must have a title'),
  description: string().defined(),
  projectId: string()
    .defined()
    .required('task must be under a project, select or create a project'),
  openTask: boolean().defined(),
  startDate: date().defined().required('Start date is required'),
  endDate: date()
    .defined()
    .when('startDate', ([startDate], schema) => {
      const d = new Date(startDate)
      const minDate = new Date(d.setDate(d.getDate() - 1))

      return startDate
        ? schema.min(minDate, "end date can't be before start date")
        : schema.nullable()
    })
    .nullable(),
  startTime: date().defined().nullable(),
  endTime: date().defined().nullable(),
  attachments: array().of(mixed<Attachment>()).defined(),
  status: mixed<Status>().defined().oneOf(Object.values(Status)).defined(),
  createdAt: date().defined(),
  updatedAt: date().defined(),
})

export default taskFormValidation
