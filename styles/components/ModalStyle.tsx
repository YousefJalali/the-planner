import styled, { css } from 'styled-components'
import { BooleanLocale } from 'yup/lib/locale'
import { Size } from '../../common/hooks/useWindowSize'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const Container = styled.div<{ windowSize: Size }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.windowSize.width}px`};
  height: ${(props) => `${props.windowSize.height}px`};
  z-index: 998;
`

const Content = styled.div<{
  centered?: boolean
  fullScreen?: Boolean
  withHeader?: boolean
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.fullScreen && '100%') || 'auto'};
  z-index: 1000;
  /* background-color: ${(props) => props.theme.colors.layout.level0}; */
  /* border-radius: ${(props) =>
    (props.fullScreen && '0') || '24px 24px 0 0'}; */
  max-height: 100%;

  ${(props) =>
    props.centered &&
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 24px;
      width: fit-content;
      height: fit-content;
      max-width: calc(100% - 48px);
    `}
`

const Child = styled.div<{ fullScreen?: boolean; withHeader?: boolean }>`
  height: ${({ fullScreen, withHeader }) =>
    (fullScreen && withHeader && 'calc(100% - 64px)') ||
    (fullScreen && !withHeader && '100%') ||
    'fit-content'};
  max-height: 100%;
  overflow-y: scroll;
  /* overflow-x: hidden;
  overflow-y: scroll; */
  /* overflow: hidden; */
`

const Header = styled.div<{ scrolling?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.layout.level0};
  ${(props) =>
    props.scrolling &&
    css`
      border-bottom: 1px solid
        ${({ theme }) => theme.colors.layout.level0accent};
    `}
`

const Modal = {
  Header,
  Child,
  Content,
  Container,
  Overlay,
}

export default Modal
