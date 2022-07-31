import userEvent from '@testing-library/user-event'
import { render } from '../../test-utils'

test('task options', () => {
  expect(true).toBe(true)
})

// import {
//   NotificationCtxProvider,
//   NotificationType,
//   useNotification,
// } from '@the-planner/hooks'
// import { renderHook, act } from '@testing-library/react-hooks'

// const notification: NotificationType = {
//   id: 'test-notification',
//   message: 'test message',
//   variant: 'critical',
// }

// describe('Notification', () => {
//   test('set notification properly', async () => {
//     const wrapper = ({ children }: { children: JSX.Element }) => (
//       <NotificationCtxProvider>{children}</NotificationCtxProvider>
//     )
//     const { result, rerender } = renderHook(() => useNotification(), {
//       wrapper,
//     })

//     act(() => {
//       result.current.setNotification(notification)
//     })

//     expect(result.current.notification).toEqual(result.current.notification)
//   })

//   test('clear notification properly', async () => {
//     const wrapper = ({ children }: { children: JSX.Element }) => (
//       <NotificationCtxProvider>{children}</NotificationCtxProvider>
//     )
//     const { result, rerender } = renderHook(() => useNotification(), {
//       wrapper,
//     })

//     act(() => {
//       result.current.setNotification(notification)
//     })
//     expect(result.current.notification).toEqual(result.current.notification)

//     act(() => {
//       result.current.clearNotification()
//     })
//     expect(result.current.notification).toEqual(null)
//   })
// })
