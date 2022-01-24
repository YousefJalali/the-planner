import styled, { css } from 'styled-components'

const Wrapper = styled.div`
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
  }
`

export default Wrapper
