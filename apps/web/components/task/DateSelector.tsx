import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { x } from '@xstyled/styled-components'
import _ from 'lodash'
import { format, parse, getDaysInMonth, setDate, isToday } from 'date-fns'

import { useWindowSize } from '@the-planner/hooks'
import { Button, ScrollableList, DateInput } from '@the-planner/ui-web'
import { URL_DATE_FORMAT } from '@the-planner/utils'

type Props = {
  dateString: string
  setUrlDate: (date: string) => void
}

const DayItem = ({
  onClick,
  active,
  day,
  date,
}: {
  onClick: (day: number) => void
  active: boolean
  day: number
  date: Date
}) => {
  return (
    <x.li
      onClick={() => onClick(day)}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minWidth="3rem"
      borderRadius={2}
      backgroundColor={
        active
          ? 'brand-primary'
          : isToday(setDate(new Date(date), day))
          ? 'brand-primary-a10'
          : 'transparent'
      }
      border="1px solid"
      borderColor="brand-primary-a10"
      p={2}
      cursor="pointer"
      data-active={active ? true : null}
      userSelect="none"
    >
      <x.span
        fontWeight="bold"
        color={active ? 'layout-level0' : 'content-contrast'}
        mb={2}
      >
        {day}
      </x.span>
      <x.span color={active ? 'layout-level0' : 'content-subtle'} fontSize="xs">
        {format(setDate(new Date(date), day), 'EE')}
      </x.span>
    </x.li>
  )
}

const DateSelector: FC<Props> = ({ dateString, setUrlDate }) => {
  const { width } = useWindowSize()

  const listRef = useRef<HTMLUListElement>(null)

  const [active, setActive] = useState(1)

  const parsedDate = parse(dateString, URL_DATE_FORMAT, new Date())

  useEffect(() => {
    setActive(parsedDate.getDate())
  }, [parsedDate])

  //center active date
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        left: (48 + 8) * (active - 1) - (width ? width / 2 - 48 : 0),
        behavior: 'smooth',
      })
    }
  }, [active, width])

  const onSelectDateHandler = (day: number) => {
    setActive(day)
    const formattedDate = format(
      new Date(parsedDate.setDate(day)),
      URL_DATE_FORMAT
    )
    setUrlDate(formattedDate)
  }

  const onChangeMonthHandler = (date: Date) => {
    const formattedDate = format(date, URL_DATE_FORMAT)
    setUrlDate(formattedDate)
  }

  const onMonthArrowClick = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      const nextMonth = new Date(parsedDate)

      if (parsedDate.getMonth() === 11) {
        nextMonth.setFullYear(parsedDate.getFullYear() + 1)
        nextMonth.setMonth(0)
        return onChangeMonthHandler(nextMonth)
      }

      nextMonth.setMonth(parsedDate.getMonth() + 1)
      return onChangeMonthHandler(nextMonth)
    }

    if (direction === 'previous') {
      const previousMonth = new Date(parsedDate)

      if (parsedDate.getMonth() === 0) {
        previousMonth.setFullYear(parsedDate.getFullYear() - 1)
        previousMonth.setMonth(11)
        return onChangeMonthHandler(previousMonth)
      }

      previousMonth.setMonth(parsedDate.getMonth() - 1)
      return onChangeMonthHandler(previousMonth)
    }
  }

  const renderDays = useMemo(
    () =>
      new Array(getDaysInMonth(parsedDate)).fill(0).map((item, i) => {
        return (
          <DayItem
            key={i}
            onClick={onSelectDateHandler}
            active={active === i + 1}
            day={i + 1}
            date={parsedDate}
          />
        )
      }),
    [parsedDate, active]
  )

  return (
    <x.div mb={4}>
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
        <Button
          name="previous month"
          backgroundColor="brand-primary-a10"
          onClick={() => onMonthArrowClick('previous')}
        >
          <x.span fontSize="1.5rem" color="content-subtle">
            <FiChevronLeft />
          </x.span>
        </Button>

        <DateInput
          selected={parsedDate}
          onChange={onChangeMonthHandler}
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
                  {format(parsedDate, 'MMMM yyyy')}
                </x.span>
              </Button>
            </div>
          }
        />
        <Button
          name="next month"
          backgroundColor="brand-primary-a10"
          onClick={() => onMonthArrowClick('next')}
        >
          <x.span fontSize="1.5rem" color="content-subtle">
            <FiChevronRight />
          </x.span>
        </Button>
      </x.div>

      <ScrollableList
        ref={listRef}
        aria-labelledby="days"
        mt={2}
        spaceX={2}
        data-date={parsedDate.toDateString()}
      >
        {renderDays}
      </ScrollableList>
    </x.div>
  )
}

export default DateSelector
