import { FieldErrors } from 'react-hook-form'

export type APIErrorType = {
  status: number
  info: string | FieldErrors
} & Error
