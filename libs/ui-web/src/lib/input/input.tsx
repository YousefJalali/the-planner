import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = (props: Props) => {
  return <input {...props} />
}

export default Input
