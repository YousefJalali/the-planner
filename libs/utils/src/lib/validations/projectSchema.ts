import { boolean, date, number, object, Schema, string } from 'yup'
import { Project } from '@the-planner/types'

//@ts-ignore
export const projectSchema: Schema<Project> = object({
  id: string().defined(),
  title: string().defined().required('project must have a title'),
  description: string().defined(),
  color: string().required('project must have a color'),
  isHidden: boolean().defined(),
  createdAt: date().defined(),
  updatedAt: date().defined(),
})

export default projectSchema
