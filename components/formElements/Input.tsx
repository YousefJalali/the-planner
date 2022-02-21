import { InputHTMLAttributes } from 'react'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

function InputComp(props: Props) {
  return <input {...props} />
}

export default InputComp
