import { FC, useEffect, useMemo, useRef, useState } from 'react'
import DatePicker from './formElements/DatePicker'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { x } from '@xstyled/styled-components'
import Icon from './Icon'
import ScrollableList from './ScrollableList'
import _ from 'lodash'
import useWindowSize from '../common/hooks/useWindowSize'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import getDay from 'date-fns/getDay'
import format from 'date-fns/format'
import setDate from 'date-fns/setDate'
import isToday from 'date-fns/isToday'

type Props = {
  dateString: string
  setDate: (date: string) => void
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
      display='flex'
      flexDirection='column'
      alignItems='center'
      minWidth='3rem'
      borderRadius={2}
      backgroundColor={
        active
          ? 'brand-primary'
          : isToday(setDate(new Date(date), day))
          ? 'brand-primary-a10'
          : 'transparent'
      }
      border='1px solid'
      borderColor='brand-primary-a10'
      p={2}
      cursor='pointer'
      data-active={active ? true : null}
      // transition='ease-out .3s'
      userSelect='none'
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
        {format(setDate(new Date(date), day), 'EE')}
      </x.span>
    </x.li>
  )
}

const DateSelector: FC<Props> = ({ dateString, setDate }) => {
  const { height, width } = useWindowSize()

  const [active, setActive] = useState(1)

  const listRef = useRef<HTMLUListElement>(null)

  const date = useMemo(() => new Date(dateString), [dateString])

  useEffect(() => {
    setActive(date.getDate())
  }, [date])

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
    const updatedDate = new Date(date.setDate(day)).toDateString()

    setActive(day)
    setDate(updatedDate)
  }

  const onChangeMonthHandler = (date: Date) => {
    setDate(date.toDateString())
  }

  const renderDays = useMemo(
    () =>
      new Array(getDaysInMonth(date)).fill(0).map((item, i) => {
        return (
          <DayItem
            key={i}
            onClick={onSelectDateHandler}
            active={active === i + 1}
            day={i + 1}
            date={date}
          />
        )
      }),
    [date, active]
  )

  return (
    <x.div mb={4}>
      <x.div
        mx={4}
        mb={3}
        p={1}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        borderRadius={2}
        border='1px solid'
        borderColor='brand-primary-a10'
      >
        <x.div backgroundColor='brand-primary-a10' borderRadius={2} p={2}>
          <Icon icon={FiChevronLeft} size='1.5rem' />
        </x.div>

        <DatePicker
          selected={date}
          onChange={onChangeMonthHandler}
          dateFormat='MMMM - yyyy'
          showMonthYearPicker
          showFourColumnMonthYearPicker
          popperPlacement='bottom-start'
          customInput={
            <x.button
              p={0}
              backgroundColor='transparent'
              display='flex'
              alignItems='center'
              justifyContent='center'
              w='100%'
            >
              <x.span
                textAlign='center'
                color='content-contrast'
                fontWeight='bold'
              >
                {format(date, 'MMMM yyyy')}
              </x.span>
            </x.button>
          }
        />
        <x.div backgroundColor='brand-primary-a10' borderRadius={2} p={2}>
          <Icon icon={FiChevronRight} size='1.5rem' />
        </x.div>
      </x.div>

      <ScrollableList
        ref={listRef}
        aria-labelledby='days'
        mt={2}
        spaceX={2}
        data-date={date.toDateString()}
      >
        {renderDays}
      </ScrollableList>
    </x.div>
  )
}

export default DateSelector
