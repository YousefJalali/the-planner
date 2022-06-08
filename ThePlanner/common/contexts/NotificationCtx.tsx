import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

export type NotificationType = {
  id: string
  message: string
  variant: 'action' | 'information' | 'warning' | 'critical' | 'confirmation'
  action?: 'view' | 'try again'
  actionFn?: (args?: any) => void
  loading?: boolean
}

type NotificationContext = {
  notification: NotificationType | null
  setNotification: (notificationData: NotificationType) => void
  clearNotification: () => void
}

const NotificationCtx = createContext<NotificationContext>({
  notification: null,
  setNotification: (notificationData) => {},
  clearNotification: () => {},
})

export const NotificationCtxProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | ReactNode
}) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  )

  const setNotificationHandler = (notificationData: NotificationType) => {
    setNotification(notificationData)
  }

  const clearNotificationHandler = () => {
    setNotification(null)
  }

  useEffect(() => {
    const clear = setTimeout(() => {
      clearNotificationHandler()
    }, 3500)

    return () => clearTimeout(clear)
  }, [notification])

  const context = {
    notification,
    setNotification: setNotificationHandler,
    clearNotification: clearNotificationHandler,
  }

  return (
    <NotificationCtx.Provider value={context}>
      {children}
    </NotificationCtx.Provider>
  )
}

export const useNotification = () => {
  const { notification, setNotification, clearNotification } =
    useContext(NotificationCtx)

  return { notification, setNotification, clearNotification }
}

export default NotificationCtx
