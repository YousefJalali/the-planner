import { InputHTMLAttributes } from 'react'
import { Wrapper } from './text-editor.style'

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false

type Props = InputHTMLAttributes<HTMLInputElement>

export const TextEditor = (props: Props) => {
  const modules = {
    toolbar: true,
  }
  return (
    <>
      <ReactQuill theme="bubble" {...props} />
    </>
  )
}

export default TextEditor
