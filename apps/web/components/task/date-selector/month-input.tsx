import { DateInput } from '../../ui'
import format from 'date-fns/format'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type ChevronTypes = {
  name: string
  onClick: () => void
  children: JSX.Element
}
const Chevron = ({ name, onClick, children }: ChevronTypes) => (
  <button
    className="btn btn-square btn-ghost bg-secondary text-secondary-content"
    name={name}
    onClick={onClick}
  >
    {children}
  </button>
)

type Props = {
  date: Date
  onChange: (date: Date) => void
}

const MonthInput = ({ date, onChange }: Props) => {
  const onMonthArrowClick = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextMonth = new Date(date)

      if (date.getMonth() === 11) {
        nextMonth.setFullYear(date.getFullYear() + 1)
        nextMonth.setMonth(0)
        return onChange(nextMonth)
      }

      nextMonth.setMonth(date.getMonth() + 1)
      return onChange(nextMonth)
    }

    if (direction === 'previous') {
      const previousMonth = new Date(date)

      if (date.getMonth() === 0) {
        previousMonth.setFullYear(date.getFullYear() - 1)
        previousMonth.setMonth(11)
        return onChange(previousMonth)
      }

      previousMonth.setMonth(date.getMonth() - 1)
      return onChange(previousMonth)
    }
  }

  return (
    <div className="space-x-2 mx-6 mb-4 p-1 flex justify-between items-center rounded-xl border border-base-300 flex-1 md:max-w-md">
      <Chevron
        name="previous month"
        onClick={() => onMonthArrowClick('previous')}
      >
        <FiChevronLeft size={24} />
      </Chevron>

      <DateInput
        selected={date}
        onChange={onChange}
        dateFormat="MMMM - yyyy"
        showMonthYearPicker
        showFourColumnMonthYearPicker
        popperPlacement="bottom"
        customInput={
          <div>
            <button name="current month" className="w-full btn btn-ghost">
              {format(date, 'MMMM yyyy')}
            </button>
          </div>
        }
      />

      <Chevron name="next month" onClick={() => onMonthArrowClick('next')}>
        <FiChevronRight size={24} />
      </Chevron>
    </div>
  )
}

export default MonthInput
