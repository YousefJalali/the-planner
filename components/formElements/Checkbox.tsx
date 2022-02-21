import styled from '@xstyled/styled-components'
import { FC } from 'react'
import { FiCheck } from 'react-icons/fi'
import Icon from '../Icon'

const CheckButton = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 1; */
  height: 100%;
  width: 100%;
  border-radius: 100%;
  background-color: layout-level0;
  border: 2px solid ${({ color }) => color};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    z-index: 1;
    stroke-width: 4px;
    stroke: layout-level0;
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
      color: content-contrast;
    }
  }
`

type Props = {
  checked: boolean
  onChange: () => void
  color: string
  id: string
}

const CheckBox: FC<Props> = ({ checked, onChange, color, id }) => {
  return (
    <Check color={color}>
      <input id={id} type='checkbox' checked={checked} onChange={onChange} />
      <CheckButton color={color} as='label' htmlFor={id}>
        <Icon icon={FiCheck} color='layout-level0' size='0.6rem' />
      </CheckButton>
    </Check>
  )
}

export default CheckBox
