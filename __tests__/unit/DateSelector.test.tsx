import { render, cleanup } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import DateSelector from '../../components/DateSelector'
import { format } from 'date-fns'
import { DATE_FORMAT } from '../../common/constants'

const getRandomArbitrary = (min: number, max: number) =>
  Math.ceil(Math.random() * (max - min) + min)

const daysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

function setup({ date }: { date: string }) {
  window.HTMLElement.prototype.scrollTo = function () {}

  const stringDate = format(new Date(date), DATE_FORMAT)
  const setDate: (stringDate: string) => void = jest.fn()

  const utils = render(
    <DateSelector dateString={stringDate} setUrlDate={setDate} />
  )

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

afterEach(cleanup)

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

    expect(days()[day - 1]).toHaveAttribute('data-active', 'true')
  })

  test('setDate should be called on DayItem click', async () => {
    const date = new Date()
    date.setDate(5)

    const { days, setDate } = setup({ date: new Date(date).toDateString() })

    const numberOfDays = daysInMonth(date)
    const day = getRandomArbitrary(1, numberOfDays)

    const index = day - 1
    const renderedDays = days()

    userEvent.click(renderedDays[index])

    expect(setDate).toHaveBeenCalledTimes(1)

    const newDate = format(new Date(date.setDate(day)), DATE_FORMAT)

    expect(setDate).toHaveBeenCalledWith(newDate)
  })

  test('active date is changing when date changes', async () => {
    let date = new Date()
    let utils = setup({ date: date.toDateString() })

    expect(utils.list).toHaveAttribute('data-date', date.toDateString())
    expect(utils.days()[date.getDate() - 1]).toHaveAttribute(
      'data-active',
      'true'
    )

    let randomDay = getRandomArbitrary(1, daysInMonth(date))
    let newDate = new Date(date.setDate(randomDay)).toDateString()
    let index = randomDay - 1

    utils.rerender(
      <DateSelector
        dateString={format(new Date(newDate), DATE_FORMAT)}
        setUrlDate={utils.setDate}
      />
    )

    expect(utils.list).toHaveAttribute('data-date', newDate)

    const renderedDays = utils.days()

    expect(renderedDays[index]).toHaveAttribute('data-active', 'true')

    //another date
    date = randomDate(new Date(2012, 5, 1), new Date())

    randomDay = getRandomArbitrary(1, daysInMonth(date))
    newDate = new Date(date.setDate(randomDay)).toDateString()
    utils.rerender(
      <DateSelector
        dateString={format(new Date(newDate), DATE_FORMAT)}
        setUrlDate={utils.setDate}
      />
    )

    // //old date should not be highlighted
    expect(utils.days()[index]).not.toHaveAttribute('data-active')

    index = randomDay - 1
    expect(utils.days()[index]).toHaveAttribute('data-active', 'true')
  })
})
