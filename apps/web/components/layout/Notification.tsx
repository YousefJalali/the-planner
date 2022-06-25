import { FC } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { useNotification } from '@the-planner/hooks'
import NotificationContent from './NotificationContent'

const Notification: FC = () => {
  const { notification, clearNotification } = useNotification()

  if (typeof window === 'undefined') return null

  return (
    <AnimatePresence exitBeforeEnter>
      {notification && (
        <>
          {createPortal(
            <NotificationContent
              notification={notification}
              clearNotification={clearNotification}
            />,
            document.getElementById('notification') as HTMLDivElement
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default Notification
