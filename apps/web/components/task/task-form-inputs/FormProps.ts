import { TaskType, TaskWithProjectType } from '@the-planner/types'
import {
  Control,
  FieldError,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

export type FormProps = {
  control: Control<TaskType>
  formName: string
}

export type SetValue = {
  setValue: UseFormSetValue<TaskType | TaskWithProjectType>
}

export type GetValues = {
  getValues: UseFormGetValues<TaskType | TaskWithProjectType>
}

export type Watch = {
  watch: UseFormWatch<TaskType>
}

export type FormErrors = {
  errors: FieldError[]
}
