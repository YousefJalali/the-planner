import styled from 'styled-components'

const Wrapper = styled.div`
  height: inherit;
  overflow-x: scroll;
  display: flex;
  min-width: 100%;
  position: relative;
  height: 156px;
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
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => (props.stretch && '100%') || 'fit-content'};
  height: 100%;

  border: 1px dashed ${({ theme: { colors } }) => colors.layout.divider};
  border-radius: ${({ theme: { radii } }) => `${radii[3]}px `};

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

    span {
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

const ImgInput = {
  Wrapper,
  Overlay,
  Input,
  ImageWrapper,
  DeleteButton,
}

export default ImgInput
