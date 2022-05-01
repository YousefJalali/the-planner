import { ButtonHTMLAttributes, FC, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import styled, { x } from '@xstyled/styled-components'
import Icon from '../Icon'
import {
  FiAlertTriangle,
  FiCheck,
  FiInfo,
  FiLoader,
  FiX,
  FiXCircle,
} from 'react-icons/fi'
import { PromptType } from '../../common/contexts/PromptCtx'
import Button from '../formElements/Button'
import { Backdrop } from './Modal'

type Props = {
  prompt: PromptType
  clearPrompt: () => void
}

const Motion = styled(motion(x.div))`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 250px;
  /* transform: translate(-50%, -50%); */
  /* width: calc(100% - 48px); */
  border-radius: 2;
  background-color: layout-level0;
  /* overflow: hidden; */
`

const Btn = ({
  children,
  color,
  onClick,
}: {
  children: string
  color: 'critical' | 'information'
  onClick: () => void
}) => (
  <x.div flex={1} display='flex' alignItems='center' justifyContent='center'>
    <Button variant='textOnly' size='small' color={color} onClick={onClick}>
      {children}
    </Button>
  </x.div>
)

const Prompt: FC<Props> = ({ prompt, clearPrompt }) => {
  const variants = useMemo<Variants>(() => {
    return {
      open: { scale: 1, opacity: 1, translateX: '-50%', translateY: '-50%' },
      closed: {
        scale: 0.5,
        opacity: 0,
        translateX: '-50%',
        translateY: '-50%',
      },
    }
  }, [])

  return (
    <x.div
      position='absolute'
      top={0}
      left={0}
      zIndex={998}
      h='100vh'
      w='100vw'
    >
      <Backdrop id={prompt.id} />

      <Motion
        transition={{ type: 'spring', duration: 0.3 }}
        initial='closed'
        animate='open'
        exit='closed'
        variants={variants}
        data-testid={prompt.id}
      >
        <x.div
          backgroundColor='layout-level0'
          borderRadius={2}
          boxShadow='#00000035 0px 5px 15px'
          p={3}
        >
          <x.div
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <x.span
              textTransform={{ firstLetter: 'uppercase' }}
              color='content-contrast'
              mb={2}
            >
              {prompt.title}
            </x.span>
            <x.span
              text='body.small'
              textTransform={{ firstLetter: 'uppercase' }}
              color='content-subtle'
              textAlign='center'
            >
              {prompt.message}
            </x.span>
          </x.div>

          <x.hr
            h='1px'
            w='100%'
            backgroundColor='layout-level2accent'
            mt={3}
            mb={2}
          />

          <x.div display='flex' divideX divideColor='layout-level2accent'>
            <Btn color='information' onClick={clearPrompt}>
              Cancel
            </Btn>
            <Btn
              color='critical'
              onClick={() => {
                prompt.actionFn()
                clearPrompt()
              }}
            >
              {prompt.action}
            </Btn>
          </x.div>
        </x.div>
      </Motion>
    </x.div>
  )
}

export default Prompt
