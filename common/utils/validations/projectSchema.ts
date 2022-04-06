import {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  ref,
  SchemaOf,
  string,
} from 'yup'
import { ProjectType } from '../../types/ProjectType'

// const taskSchema: SchemaOf<Omit<TaskType, 'id' | 'status'>> = object({
const projectSchema: SchemaOf<ProjectType> = object({
  id: string().defined(),
  title: string().defined().required('project must have a title'),
  description: string().defined(),
  color: string().required('project have a color'),
  tasks: array().defined(),
  proposed: number().defined(),
  inprogress: number().defined(),
  completed: number().defined(),
  progressPercentage: number().defined(),
  isHidden: boolean().defined(),
})

export default projectSchema
