import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { x } from '@xstyled/styled-components'
import { format, parse, getDaysInMonth } from 'date-fns'

import { useWindowSize } from '@the-planner/hooks'
import {
  formatToUrlDate,
  parseUrlDate,
  URL_DATE_FORMAT,
} from '@the-planner/utils'
import DaysList from './days-list'
import DayItem from './day-item'
import MonthInput from './month-input'

type Props = {
  dateString: string
  setUrlDate: (date: string) => void
}

export const DateSelector: FC<Props> = ({ dateString, setUrlDate }) => {
  const { width } = useWindowSize()

  const listRef = useRef<HTMLUListElement>(null)

  const [active, setActive] = useState(1)

  const parsedDate = parseUrlDate(dateString)
  // const parsedDate = parse(dateString, URL_DATE_FORMAT, new Date())

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
    const formattedDate = formatToUrlDate(parsedDate.setDate(day))
    // format(
    //   new Date(parsedDate.setDate(day)),
    //   URL_DATE_FORMAT
    // )
    setUrlDate(formattedDate)
  }

  const onChangeMonthHandler = (date: Date) => {
    const formattedDate = formatToUrlDate(date)
    // const formattedDate = format(date, URL_DATE_FORMAT)
    setUrlDate(formattedDate)
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
      <MonthInput date={parsedDate} onChange={onChangeMonthHandler} />

      <DaysList ref={listRef} date={parsedDate.toDateString()}>
        {renderDays}
      </DaysList>
    </x.div>
  )
}

export default DateSelector
