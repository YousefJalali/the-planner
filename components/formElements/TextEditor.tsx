import { InputHTMLAttributes } from 'react'
import Wrapper from '../../styles/components/TextEditorStyle'

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false
import 'react-quill/dist/quill.bubble.css'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

function TextEditor(props: Props) {
  return (
    <Wrapper readonly={props.readOnly}>
      <ReactQuill theme='bubble' {...props} />
    </Wrapper>
  )
}

export default TextEditor
