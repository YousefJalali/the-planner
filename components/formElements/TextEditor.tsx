import { InputHTMLAttributes } from 'react'
import styled, { css } from '@xstyled/styled-components'

const ReactQuill =
  typeof window === 'object' ? require('react-quill') : () => false
import 'react-quill/dist/quill.bubble.css'

const Wrapper = styled.div<{ readonly?: boolean }>`
  .ql-container {
    background-color: layout-level0;
    border: 0;
    border-radius: 2;

    .ql-editor {
      line-height: normal;
      font-family: 'DM Sans';
      font-size: sm;
      min-height: calc(21px * 3 + 32px);
      max-height: calc(21px * 6 + 32px);
      padding: 3 2;
    }

    [data-placeholder]::before {
      color: content-nonessential;
      font-family: 'DM Sans';
      left: 0.5rem;
      right: 0;
      font-style: normal;
    }

    ${(props) =>
      props.readonly &&
      css`
        background-color: transparent;
        border-radius: 0;
        .ql-editor {
          min-height: auto;
          max-height: calc(21px * 16 + 32px);
          padding: 0;
          font-size: default;
          color: content-subtle;
        }
      `}
  }
`

type Props = {} & InputHTMLAttributes<HTMLInputElement>

function TextEditor(props: Props) {
  const modules = {
    toolbar: true,
  }
  return (
    <Wrapper readonly={props.readOnly}>
      <ReactQuill theme='bubble' {...props} />
    </Wrapper>
  )
}

export default TextEditor
