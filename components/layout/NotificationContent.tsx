import { FC, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { NotificationType } from '../../common/contexts/NotificationCtx'
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

const Motion = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: calc(100% - 48px);
  border-radius: 2;
  background-color: layout-level0;
  overflow: hidden;
`

type Props = {
  notification: NotificationType
  clearNotification: () => void
}

const Notification: FC<Props> = ({ notification, clearNotification }) => {
  const variants = useMemo<Variants>(() => {
    return {
      open: { y: 0 },
      closed: { y: 100 },
    }
  }, [])

  return (
    <Motion
      transition={{ type: 'spring', duration: 0.3 }}
      initial='closed'
      animate='open'
      exit='closed'
      variants={variants}
      data-testid={notification.id}
    >
      <x.div
        backgroundColor={`utility-${notification.variant}-a20`}
        border='1px solid'
        borderColor={`utility-${notification.variant}-a50`}
        borderRadius={2}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        p={2}
      >
        <x.div display='flex' alignItems='center'>
          <x.div
            backgroundColor={`utility-${notification.variant}`}
            p={1}
            borderRadius={4}
          >
            <Icon
              icon={
                notification.variant === 'confirmation'
                  ? FiCheck
                  : notification.variant === 'warning'
                  ? FiAlertTriangle
                  : notification.variant === 'critical'
                  ? FiXCircle
                  : FiInfo
              }
              color='layout-level0'
            />
          </x.div>

          <x.span color='content-default' ml={2} textTransform='capitalize'>
            {notification.message}
          </x.span>
        </x.div>

        {notification.loading ? (
          <x.div animation='spin'>
            <Icon icon={FiLoader} />
          </x.div>
        ) : (
          <x.div display='flex' alignItems='center'>
            <x.div mr={2}>
              <x.a
                onClick={notification.actionFn}
                text='body.small'
                textDecoration='underline'
              >
                {notification.action}
              </x.a>
            </x.div>

            <x.a onClick={clearNotification}>
              <Icon icon={FiX} color='content-subtle' />
            </x.a>
          </x.div>
        )}
      </x.div>
    </Motion>
  )
}

export default Notification
