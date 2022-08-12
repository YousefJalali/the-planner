import { Button, DateInput } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import format from 'date-fns/format'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type ChevronTypes = {
  name: string
  onClick: () => void
  children: JSX.Element
}
const Chevron = ({ name, onClick, children }: ChevronTypes) => (
  <Button name={name} onClick={onClick} backgroundColor="brand-primary-a10">
    <x.span fontSize="1.5rem" color="content-subtle">
      {children}
    </x.span>
  </Button>
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
    <x.div
      mx={4}
      mb={3}
      p={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius={2}
      border="1px solid"
      borderColor="brand-primary-a10"
    >
      <Chevron
        name="previous month"
        onClick={() => onMonthArrowClick('previous')}
      >
        <FiChevronLeft />
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
            <Button name="current month" variant="textOnly" w="100%">
              <x.span
                textAlign="center"
                color="content-contrast"
                fontWeight="bold"
              >
                {format(date, 'MMMM yyyy')}
              </x.span>
            </Button>
          </div>
        }
      />

      <Chevron name="next month" onClick={() => onMonthArrowClick('next')}>
        <FiChevronRight />
      </Chevron>
    </x.div>
  )
}

export default MonthInput
