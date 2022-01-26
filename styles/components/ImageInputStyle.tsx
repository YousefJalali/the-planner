import styled, { css } from 'styled-components'

const Wrapper = styled.div<{ error: boolean }>`
  height: inherit;
  overflow-x: scroll;
  display: flex;
  min-width: 100%;
  position: relative;
  height: 156px;

  ${({ error, theme: { colors } }) =>
    error &&
    css`
      ${Input} {
        border-color: colors.utility.critical;

        label {
          svg {
            stroke: colors.utility.critical;
          }
          span {
            color: colors.utility.critical;
          }
        }
      }

      ${SupportiveText}, span {
        color: ${colors.utility.critical};
      }
    `}
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
  border-radius: 10px;
`

const Input = styled.div<{ stretch: boolean }>`
  border: 1px dashed ${({ theme: { colors } }) => colors.layout.divider};
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => (props.stretch && '100%') || 'fit-content'};
  height: 100%;

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  label {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;

    svg {
      stroke: ${({ theme: { colors } }) => colors.content.contrast};
      margin-right: 8px;
    }

    span {
      font-size: 1rem;
      font-weight: 400;
      text-transform: none;
      color: ${({ theme: { colors } }) => colors.content.nonessential};
      white-space: nowrap;
    }
  }
`

const ImageWrapper = styled.div`
  flex: 0 0 auto;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`

const DeleteButton = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  height: 24px;
  width: 24px;
  border-radius: 100px;
  background-color: ${({ theme: { colors } }) => colors.layout.level3accent};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SupportiveText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[0]}px;
  line-height: ${({ theme }) => theme.lineHeights[1]};
  color: ${({ theme }) => theme.colors.content.subtle};
  display: inline-block;
  margin-top: ${({ theme: { space } }) => `${space[0]}px `};

  &:first-letter {
    text-transform: uppercase;
  }
`

const ErrorMessage = styled(SupportiveText)<{ error?: boolean }>`
  color: ${({ theme: { colors } }) => colors.utility.critical};
`

const ImgInput = {
  Wrapper,
  Overlay,
  Input,
  ImageWrapper,
  DeleteButton,
  SupportiveText,
  ErrorMessage,
}

export default ImgInput
