import { render } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import Notification from '../../components/layout/NotificationContent'
import { waitFor } from '@testing-library/dom'
import { NotificationType } from '../../common/contexts/NotificationCtx'

function setup({
  notification = {
    id: 'test-notification',
    message: 'Deleting...',
    variant: 'critical',
  },
}: {
  notification?: NotificationType
}) {
  const clearNotification: () => void = jest.fn()

  const utils = render(
    <Notification
      notification={notification}
      clearNotification={clearNotification}
    />
  )

  const notificationPrompt = utils.getByTestId(notification.id)

  const { rerender } = utils

  return {
    ...utils,
    rerender,
    notificationPrompt,
  }
}

describe('Notification', () => {
  test.only('show notification when context', async () => {
    const utils = setup({})

    expect(utils.notificationPrompt).toBeInTheDocument()
  })
})
