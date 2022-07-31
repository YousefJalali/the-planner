import { FC, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import styled, { x } from '@xstyled/styled-components'
import { v4 as uuid } from 'uuid'

import { NotificationType } from '@the-planner/hooks'
import {
  FiAlertTriangle,
  FiCheck,
  FiInfo,
  FiX,
  FiXCircle,
} from 'react-icons/fi'
import { Spinner } from '@the-planner/ui-web'

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

  const id = notification.id || uuid()

  return (
    <Motion
      transition={{ type: 'spring', duration: 0.3 }}
      initial="closed"
      animate="open"
      exit="closed"
      variants={variants}
      data-testid={id}
    >
      <x.div
        backgroundColor="layout-level2accent"
        borderRadius={2}
        display="flex"
        h={36}
      >
        <x.div display="flex" alignItems="center" h="100%">
          <x.div
            backgroundColor={`utility-${notification.variant}`}
            px={2}
            h="100%"
            display="flex"
            alignItems="center"
          >
            <x.span color="layout-level0">
              {notification.variant === 'confirmation' ? (
                <FiCheck />
              ) : notification.variant === 'warning' ? (
                <FiAlertTriangle />
              ) : notification.variant === 'critical' ? (
                <FiXCircle />
              ) : (
                <FiInfo />
              )}
            </x.span>
          </x.div>
        </x.div>

        <x.div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="calc(100% - 32px)"
          px={2}
        >
          <x.span
            text="body.small"
            color="content-default"
            textTransform={{ firstLetter: 'uppercase' }}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            minWidth={0}
          >
            {notification.message}
          </x.span>

          <x.div
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            ml={2}
          >
            {notification.loading ? (
              <x.div data-testid={`${id}-loading`}>
                <Spinner
                  pathColor="content-subtle"
                  trailColor="layout-level0accent"
                />
              </x.div>
            ) : (
              <>
                <x.a
                  onClick={notification.actionFn}
                  text="body.small"
                  textDecoration="underline"
                  data-testid={`${id}-action`}
                  mx={2}
                  whiteSpace="nowrap"
                >
                  {notification.action}
                </x.a>

                <x.a
                  onClick={clearNotification}
                  data-testid={`${notification.id}-close`}
                  color="content-subtle"
                >
                  <FiX />
                </x.a>
              </>
            )}
          </x.div>
        </x.div>
      </x.div>
    </Motion>
  )
}

export default Notification
