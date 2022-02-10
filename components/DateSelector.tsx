import { Box, Subhead, Text } from '../styles'
import styled, { css } from 'styled-components'
import { FC, useEffect, useMemo, useRef } from 'react'
import DatePicker from './formElements/DatePicker'
import { ChevronDown } from 'lucide-react'

const Item = styled.li<{ selected: true | null }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 48px;
  border-radius: ${({ theme }) => `${theme.radii[3]}px`};
  background-color: ${({ theme: { colors } }) => colors.layout.level0};
  padding: ${({ theme }) => `${theme.space[1]}px`};
  cursor: pointer;
  &:not(:last-child) {
    margin-right: ${({ theme }) => `${theme.space[1]}px`};
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: ${({ theme: { colors } }) => colors.brand.primary};
      > span {
        color: ${({ theme: { colors } }) => colors.layout.level0};
      }
    `}
`

const List = styled.ul`
  display: flex;
  overflow-x: scroll;
  padding: 0 24px;
  margin-top: ${({ theme }) => `${theme.space[1]}px`}; ;
`

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
    <Box mb={3}>
      <Box mx={3}>
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
            <Box
              p={1}
              backgroundColor='layout.level0'
              borderRadius={3}
              display='flex'
              alignItems='center'
              width='fit-content'
            >
              <Subhead as='span' size='default' mr={1}>
                {month}
              </Subhead>
              <ChevronDown size={20} />
            </Box>
          }
        />
      </Box>

      <List ref={listRef} aria-labelledby='days'>
        {new Array(daysInMonth).fill(0).map((item, i) => {
          const day = i + 1
          const constructDate = new Date(stringDate)
          constructDate.setDate(i)
          return (
            <Item
              key={i}
              data-selected={selected === day ? 'true' : null}
              selected={selected === day ? true : null}
              onClick={() => onSelectDateHandler(day)}
            >
              <Text as='span' fontWeight='bold' color='content.contrast' mb={1}>
                {day}
              </Text>
              <Text as='span' color='content.nonessential' fontSize={1}>
                {weekdays[constructDate.getDay()]}
              </Text>
            </Item>
          )
        })}
      </List>
    </Box>
  )
}

export default DateSelector
