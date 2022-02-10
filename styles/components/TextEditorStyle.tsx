import styled, { css } from 'styled-components'

const Wrapper = styled.div<{ readonly?: boolean }>`
  .ql-container {
    background-color: ${({ theme: { colors } }) => colors.layout.level0};
    border: 0;
    border-radius: ${({ theme: { radii } }) => `${radii[3]}px `};

    .ql-editor {
      line-height: ${({ theme }) => theme.lineHeights[2]};
      padding: 0;
      font-family: 'DM Sans';
      font-size: ${({ theme }) => theme.fontSizes[1]}px;
      min-height: calc(21px * 3 + 32px);
      max-height: calc(21px * 6 + 32px);
      padding: ${({ theme: { space } }) => `${space[1]}px `};
    }

    [data-placeholder]::before {
      color: ${({ theme: { colors } }) => colors.content.nonessential};
      font-family: 'DM Sans';
      left: 8px;
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
          font-size: ${({ theme }) => theme.fontSizes[2]}px;
          color: ${({ theme: { colors } }) => colors.content.subtle};
        }
      `}
  }
`

export default Wrapper
