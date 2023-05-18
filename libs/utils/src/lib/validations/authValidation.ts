import {
  ForgotPassword,
  Login,
  NewUser,
  ResetPassword,
  UpdateProfile,
} from '@the-planner/types'
import { object, ref, Schema, string } from 'yup'

//@ts-ignore
export const loginValidation: Schema<Login> = object({
  email: string().email().defined().required('Enter your email'),
  password: string().defined().required('Enter your password'),
})

//@ts-ignore
export const signUpValidation: Schema<NewUser> = object({
  name: string().defined().required('Enter your full name'),
  email: string().email().defined().required('Enter your email'),
  password: string().defined().required('Enter your password'),
})

//@ts-ignore
export const forgotPasswordValidation: Schema<ForgotPassword> = object({
  email: string().email().defined().required('Enter your email'),
})

//@ts-ignore
export const resetPasswordValidation: Schema<ResetPassword> = object({
  password: string().defined().required('Enter new password'),
  confirmPassword: string()
    .defined()
    .oneOf([ref('password'), ''], 'Passwords must match'),
})

//@ts-ignore
export const updateProfileValidation: Schema<UpdateProfile> = object({
  displayName: string().defined().required('Enter your full name'),
})
