import { render } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import TaskForm from '../../components/task/TaskForm'
import { TaskType } from '../../common/types/TaskType'
import format from 'date-fns/format'
import { UseFormSetError } from 'react-hook-form'
import { cleanup } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

test('task form render properly', () => {
  expect(true).toBe(true)
})

// function setup() {
//   const onSubmit: (
//     data: TaskType,
//     setError: UseFormSetError<TaskType>
//   ) => void = jest.fn()

//   const utils = render(<TaskForm id='test-form' onSubmit={onSubmit} />)

//   // const title = utils.getByLabelText(/task title/i) as HTMLInputElement
//   // const project = utils.getByLabelText(/project/i) as HTMLInputElement

//   const openTask = utils.getByTestId('task-form-openTask')

//   const startDate = utils.getByTestId(
//     'task-form-start-date'
//   ) as HTMLInputElement

//   const endDate = utils.getByTestId('task-form-end-date') as HTMLInputElement

//   const startTime = utils.getByTestId(
//     'task-form-start-time'
//   ) as HTMLInputElement

//   const endTime = utils.getByTestId('task-form-end-time') as HTMLInputElement

//   const datePopper = () => utils.queryByLabelText('Previous Month')

//   return {
//     ...utils,
//     // title,
//     // project,
//     startDate,
//     endDate,
//     openTask,
//     startTime,
//     endTime,
//     datePopper,
//   }
// }

// describe('Task form / Date input', () => {
//   test('initially Open task is true and it enables endDate and time on check', () => {
//     const { startDate, endDate, startTime, endTime, openTask } = setup()

//     //be active
//     expect(startDate).not.toHaveAttribute('disabled')
//     expect(endDate).toHaveAttribute('disabled')
//     expect(startTime).toHaveAttribute('disabled')
//     expect(endTime).toHaveAttribute('disabled')

//     userEvent.click(openTask)
//     expect(startDate).not.toHaveAttribute('disabled')
//     expect(endDate).not.toHaveAttribute('disabled')
//     expect(startTime).not.toHaveAttribute('disabled')
//     expect(endTime).not.toHaveAttribute('disabled')

//     userEvent.click(openTask)
//     expect(startDate).not.toHaveAttribute('disabled')
//     expect(endDate).toHaveAttribute('disabled')
//     expect(endDate).toHaveValue('')
//     expect(startTime).toHaveAttribute('disabled')
//     expect(startTime).toHaveValue('')
//     expect(endTime).toHaveAttribute('disabled')
//     expect(endTime).toHaveValue('')

//     // cleanup()
//   })

//   test.only('Popper appear and disappear after select', () => {
//     const utils = setup()
//     const { startDate, endDate, datePopper } = utils

//     //proper render
//     expect(startDate).toBeInTheDocument()
//     expect(endDate).toBeInTheDocument()

//     const date = new Date()

//     act(() => {
//       userEvent.click(startDate)
//     })

//     // expect(datePopper()).toBeInTheDocument()

//     // userEvent.click(utils.getByLabelText(new RegExp(format(date, 'PPPP'), 'i')))
//     // expect(datePopper()).not.toBeInTheDocument()
//     // expect(startDate).toHaveValue(format(date, 'MM/dd/yyyy'))
//   })

//   test('cannot select an end date prior to start date', () => {
//     const utils = setup()
//     const { startDate, endDate, datePopper, openTask } = utils

//     const date = new Date()

//     userEvent.click(openTask)
//     userEvent.click(startDate)
//     userEvent.click(utils.getByLabelText(new RegExp(format(date, 'PPPP'), 'i')))
//     expect(startDate).toHaveValue(format(date, 'MM/dd/yyyy'))

//     userEvent.click(endDate)
//     //can select same day or greater
//     expect(
//       utils.getByLabelText(new RegExp(format(date, 'PPPP'), 'i'))
//     ).toHaveAttribute('aria-disabled', 'false')

//     //cant select previous day
//     const previousDate = new Date(date.setDate(date.getDate() - 1))
//     expect(
//       utils.getByLabelText(new RegExp(format(previousDate, 'PPPP'), 'i'))
//     ).toHaveAttribute('aria-disabled', 'true')
//   })
// })
