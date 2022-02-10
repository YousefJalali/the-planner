import styled, { css } from 'styled-components'
import { Size } from '../../common/hooks/useWindowSize'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  /* touch-action: none; */
`

const Child = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  background-color: ${({ theme: { colors } }) => colors.layout.level0};
  position: relative;
`

const Container = styled.div<{ windowSize: Size }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.windowSize.width}px`};
  height: ${(props) => `${props.windowSize.height}px`};
  z-index: 998;

  ${Child} {
    max-height: ${(props) =>
      `${
        props.windowSize.height
          ? props.windowSize.height - 48 - 24
          : props.windowSize.height
      }px`};
  }
`

const Content = styled.div<{
  centered?: boolean
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  max-height: 100%;
  border-radius: ${({ theme }) =>
    `${theme.radii[4]}px ${theme.radii[4]}px 0 0`};
  overflow: hidden;

  ${(props) =>
    props.centered &&
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: ${({ theme }) => `${theme.radii[4]}px `};
      width: fit-content;
      height: fit-content;
      max-width: calc(100% - 48px);
    `};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 ${({ theme }) => theme.space[3]}px;
  background-color: ${({ theme }) => theme.colors.layout.level0};
  border-bottom: 1px solid ${({ theme }) => theme.colors.layout.divider}; ;
`

const Modal = {
  Header,
  Child,
  Content,
  Container,
  Overlay,
}

export default Modal
