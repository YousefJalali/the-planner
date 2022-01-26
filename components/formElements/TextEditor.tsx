import { InputHTMLAttributes } from 'react'
import Wrapper from '../../styles/components/TextEditorStyle'
import Input from '../../styles/components/InputStyle'

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false
import 'react-quill/dist/quill.bubble.css'

type Props = {} & InputHTMLAttributes<HTMLInputElement>

function TextEditor(props: Props) {
  // const [focus, setFocus] = useState(false)

  // const onFocusHandler = () => setFocus(true)
  // const onBlurHandler = () => setFocus(false)

  return (
    <Input.Wrapper>
      <Wrapper>
        <ReactQuill theme='bubble' {...props} />
      </Wrapper>
    </Input.Wrapper>
  )
}

export default TextEditor
