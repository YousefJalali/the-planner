import { InputHTMLAttributes } from 'react'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

function Input(props: Props) {
  return <input {...props} />
}

export default Input
