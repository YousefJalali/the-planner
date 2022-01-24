import { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import Fieldset from './Fieldset'
import Wrapper from '../../styles/components/TextEditorStyle'

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false
import 'react-quill/dist/quill.bubble.css'

type Props<T> = {} & UseControllerProps<T>

function TextEditor<T extends Record<string, any> = Record<string, any>>(
  props: Props<T>
) {
  const [focus, setFocus] = useState(false)
  const {
    field: { onChange, value, name },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController(props)

  const onFocusHandler = () => setFocus(true)
  const onBlurHandler = () => setFocus(false)

  return (
    <Fieldset label='description' focus={focus} error={error}>
      <Wrapper>
        <ReactQuill
          theme='bubble'
          placeholder='Enter a description'
          onChange={onChange}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </Wrapper>
    </Fieldset>
  )
}

export default TextEditor
