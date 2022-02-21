import { FC, useEffect, useMemo, useRef } from 'react'
import DatePicker from './formElements/DatePicker'
import { FiChevronDown } from 'react-icons/fi'
import styled, { x, css } from '@xstyled/styled-components'
import Icon from './Icon'

type Props = {
  date: string
  setDate: (date: string) => void
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const DateSelector: FC<Props> = (props) => {
  const listRef = useRef<HTMLUListElement>(null)

  const { date: stringDate, setDate } = props
  const date = useMemo(() => new Date(stringDate), [stringDate])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        left: (48 + 8) * (date.getDate() - 1),
        behavior: 'smooth',
      })
    }
  }, [date])

  const selected = date.getDate()

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()

  const onSelectDateHandler = (day: number) => {
    const updatedDate = new Date(date.setDate(day)).toDateString()
    setDate(updatedDate)
  }

  const month = `${monthNames[date.getMonth()]} ${date.getFullYear()}`

  return (
    <x.div mb={4}>
      <x.div mx={4}>
        <DatePicker
          selected={date}
          onChange={(date) => {
            if (date && date instanceof Date) {
              setDate(date.toDateString())
            }
          }}
          dateFormat='MMMM - yyyy'
          showMonthYearPicker
          showFourColumnMonthYearPicker
          popperPlacement='bottom-start'
          customInput={
            <x.div
              p={2}
              backgroundColor='layout-level0accent'
              borderRadius={2}
              display='flex'
              alignItems='center'
              w='fit-content'
            >
              <x.span color='content-contrast' fontWeight='bold' mr={3}>
                {month}
              </x.span>
              <Icon icon={FiChevronDown} />
            </x.div>
          }
        />
      </x.div>

      <x.ul
        ref={listRef}
        aria-labelledby='days'
        display='flex'
        overflowX='scroll'
        px={4}
        mt={2}
        spaceX={2}
      >
        {new Array(daysInMonth).fill(0).map((item, i) => {
          const day = i + 1
          const active = selected === day
          const constructDate = new Date(stringDate)
          constructDate.setDate(i)
          return (
            <x.li
              key={i}
              data-selected={active ? 'true' : null}
              onClick={() => onSelectDateHandler(day)}
              display='flex'
              flexDirection='column'
              alignItems='center'
              minWidth='3rem'
              borderRadius={2}
              backgroundColor={active ? 'brand-primary' : 'layout-level0accent'}
              p={2}
              cursor='pointer'
            >
              <x.span
                fontWeight='bold'
                color={active ? 'layout-level0' : 'content-contrast'}
                mb={2}
              >
                {day}
              </x.span>
              <x.span
                color={active ? 'layout-level0' : 'content-nonessential'}
                fontSize='xs'
              >
                {weekdays[constructDate.getDay()]}
              </x.span>
            </x.li>
          )
        })}
      </x.ul>
    </x.div>
  )
}

export default DateSelector
