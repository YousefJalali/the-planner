import { render } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import DateSelector from '../../components/DateSelector'

const getRandomArbitrary = (min: number, max: number) =>
  Math.ceil(Math.random() * (max - min) + min)

const daysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

function setup({ date }: { date: string }) {
  window.HTMLElement.prototype.scrollTo = function () {}

  const setDate: (date: string) => void = jest.fn()

  const utils = render(<DateSelector date={date} setDate={setDate} />)

  const list = utils.getByRole('list')
  const days = () => utils.getAllByRole('listitem')

  const { rerender } = utils

  return {
    ...utils,
    rerender,
    list,
    days,
    setDate,
  }
}

describe('Date selector', () => {
  test('render the number of days in a month', async () => {
    const date = new Date()
    const numberOfDays = daysInMonth(date)

    const { days } = setup({ date: date.toDateString() })

    expect(days().length).toBe(numberOfDays)
  })

  test('highlight selected date', async () => {
    const date = new Date()
    const day = date.getDate()

    const { days } = setup({ date: date.toDateString() })

    expect(days()[day - 1]).toHaveAttribute('data-selected', 'true')
  })

  test('onChange date', async () => {
    const date = new Date()

    const { days, setDate, rerender } = setup({ date: date.toDateString() })

    const numberOfDays = daysInMonth(date)
    const day = getRandomArbitrary(1, numberOfDays)

    const index = day - 1

    const newDate = new Date(date.setDate(day)).toDateString()

    userEvent.click(days()[index])

    expect(setDate).toHaveBeenCalledTimes(1)
    expect(setDate).toHaveBeenCalledWith(newDate)
  })

  test('selected date is changing when props changed', async () => {
    let date = new Date()
    let utils = setup({ date: date.toDateString() })

    let numberOfDays = daysInMonth(date)
    let day = getRandomArbitrary(1, numberOfDays)
    let newDate = new Date(date.setDate(day)).toDateString()
    let index = day - 1

    utils.rerender(<DateSelector date={newDate} setDate={utils.setDate} />)
    expect(utils.days()[index]).toHaveAttribute('data-selected', 'true')

    //another date
    date = randomDate(new Date(2012, 5, 1), new Date())
    numberOfDays = daysInMonth(date)
    day = getRandomArbitrary(1, numberOfDays)
    newDate = new Date(date.setDate(day)).toDateString()
    utils.rerender(<DateSelector date={newDate} setDate={utils.setDate} />)

    //old date should not be highlighted
    expect(utils.days()[index]).not.toHaveAttribute('data-selected')

    index = day - 1
    expect(utils.days()[index]).toHaveAttribute('data-selected', 'true')
  })
})
