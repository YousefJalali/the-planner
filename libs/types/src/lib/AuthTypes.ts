import { User as UserType } from '@prisma/client'

export type User = UserType
export type NewUser = { name: string; email: string; password: string }
export type Login = { email: string; password: string }
export type ForgotPassword = { email: string }
export type ResetPassword = { password: string; confirmPassword: string }
export type UpdateProfile = { displayName: string }
