import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div<{ readonly?: boolean }>`
  .ql-container {
    line-height: normal;
    font-family: 'DM Sans';
    background-color: layout-level0;
    border: 0;
    border-radius: 2;

    .ql-editor {
      font-size: sm;
      min-height: calc(21px * 3 + 32px);
      max-height: calc(21px * 6 + 32px);
      padding: 0;
    }

    [data-placeholder]::before {
      color: content-nonessential;
      font-family: 'DM Sans';
      left: 0;
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
          color: inherit;
        }
      `}
  }
`
