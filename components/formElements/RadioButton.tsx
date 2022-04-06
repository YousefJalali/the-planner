import { FC, InputHTMLAttributes } from 'react'
import styled, { x, useTh } from '@xstyled/styled-components'

type Props = {
  label?: string
  px?: number
  py?: number
} & InputHTMLAttributes<HTMLInputElement>

const RadioButton: FC<Props> = ({ label, px = 3, py = 3, ...props }) => {
  const padding: string = useTh('space')[px] || '0'

  return (
    <Wrapper>
      <input type='radio' {...props} />
      <Check px={padding} />
      <x.label
        htmlFor={props.id}
        display='inline-block'
        w='100%'
        zIndex={1}
        m={0}
        pr={px}
        pl={`calc(${padding || 1} + 1.25rem + 0.5rem)`}
        py={py}
        lineHeight='1.25rem'
        textTransform='capitalize'
        color='content-default'
        cursor='pointer'
      >
        {label}
      </x.label>
    </Wrapper>
  )
}

const Check = styled.div<{ px: string }>`
  position: absolute;
  top: 50%;
  left: ${(props) => props.px};
  transform: translateY(-50%);
  z-index: 1;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 100%;
  background-color: layout-level0;
  border: 2px solid;
  border-color: layout-divider;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 100%;
    background-color: transparent;
  }
`

const Wrapper = styled(x.div)`
  position: relative;
  width: 100%;
  height: 100%;

  input[type='radio'] {
    margin: 0;
    height: 0;
    width: 0;
    visibility: hidden;
  }

  input[type='radio']:checked {
    & ~ ${Check} {
      border: 2px solid;
      border-color: brand-primary;

      &:after {
        background-color: brand-primary;
      }
    }

    & ~ label {
      color: content-contrast;
      background-color: layout-level0accent;
    }
  }
`

export default RadioButton
