import { array, boolean, date, mixed, object, ref, SchemaOf, string } from 'yup'
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
    endDate: date()
      .when('startDate', (startDate, schema) => {
        const d = new Date(startDate)
        const minDate = new Date(d.setDate(d.getDate() - 1))

        return startDate
          ? schema.min(minDate, "end date can't be before start date")
          : schema.nullable()
      })
      .defined()
      .nullable(),
  }).defined(),
  time: object({
    startTime: date().defined().nullable(),
    endTime: date()
      .when('title', (startTime, schema) => {
        console.log('schema', startTime)
        const d = new Date(startTime)
        const minTime = new Date(d.setMinutes(d.getMinutes() + 29))

        return schema.nullable()
        // return startTime
        //   ? schema.min(minTime, "end time can't be before start time")
        //   : schema.nullable()
      })
      .defined()
      .nullable(),
  }).defined(),
  attachments: array(),
  status: mixed<Status>().oneOf(Object.values(Status)).defined(),
})

export default taskSchema
