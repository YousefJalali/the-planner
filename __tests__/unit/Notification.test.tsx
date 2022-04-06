import { render } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import Notification from '../../components/layout/Notification'
import { waitFor } from '@testing-library/dom'
import NotificationCtx, {
  NotificationCtxProvider,
  NotificationType,
} from '../../common/contexts/NotificationCtx'
import { useContext } from 'react'

const notification: NotificationType = {
  id: 'test-notification',
  message: 'test message',
  variant: 'critical',
}

function setup() {
  // const clearNotification: () => void = jest.fn()

  const utils = render(<Notification />)

  const notificationPrompt = utils.getByTestId(notification.id)
  const action = utils.getByTestId(`${notification.id}-action`)
  const closeBtn = utils.getByTestId(`${notification.id}-close`)

  const { rerender } = utils

  return {
    ...utils,
    rerender,
    // clearNotification,
    notificationPrompt,
    action,
    closeBtn,
  }
}

describe('Notification', () => {
  test('show notification when context', async () => {
    const { setNotification } = useContext(NotificationCtx)

    const utils = setup()

    expect(utils.notificationPrompt).not.toBeInTheDocument()
    // expect(utils.notificationPrompt).toHaveTextContent('test message')
  })

  // test('disappear when close btn clicked', async () => {
  //   const utils = setup()

  //   expect(utils.notificationPrompt).toBeInTheDocument()
  //   userEvent.click(utils.closeBtn)
  //   expect(utils.notificationPrompt).not.toBeInTheDocument()
  //   // expect(utils.clearNotification).toHaveBeenCalledTimes(1)
  // })
})
