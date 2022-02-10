import styled, { css } from 'styled-components'
import { animated } from '@react-spring/web'

const Container = styled.li`
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.theme.radii[3]}px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

const Content = styled.div`
  position: relative;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.layout.level1};
`

const Info = styled.div<{ completed: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(100% - 24px - 12px);

  svg {
    stroke: ${(props) => props.theme.colors.content.subtle};
  }

  ${(props) =>
    props.completed &&
    css`
      > p {
        text-decoration: line-through;
        color: ${props.theme.colors.content.nonessential};
      }
    `}
`

const Cta = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  background-color: red;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    background-color: ${(props) => props.theme.colors.utility.action};

    &:first-child {
      background-color: ${(props) => props.theme.colors.utility.critical};
    }

    > svg {
      stroke: ${(props) => props.theme.colors.layout.level0};
    }
  }
`

const Details = styled.div`
  display: flex;
`

//check button
const CheckButton = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 1; */
  height: 100%;
  width: 100%;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.layout.level0};
  border: 2px solid ${({ color }) => color};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    z-index: 1;
    stroke-width: 4px;
    stroke: ${({ theme }) => theme.colors.layout.level0};
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 90%;
    width: 90%;
    border-radius: 100%;
    background-color: transparent;
  }
`

const Check = styled.div<{ color: string }>`
  display: block;
  height: 24px;
  width: 24px;
  position: relative;

  /* label {
    z-index: 10;
    margin: 0;
    line-height: 1;
    cursor: pointer;
    width: 100%;
    text-transform: none;
    padding: 12px;
  } */

  input[type='checkbox'] {
    margin: 0;
    height: 0;
    width: 0;
    visibility: hidden;
  }

  input[type='checkbox']:checked {
    & ~ ${CheckButton} {
      &:after {
        background-color: ${(props) => props.color};
      }
    }

    & ~ label {
      color: ${({ theme }) => theme.colors.content.contrast};
    }
  }
`

const Task = {
  Container,
  Content,
  Info,
  Details,
  Check,
  Cta,
  CheckButton,
}

export default Task
