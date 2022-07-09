import { x } from '@xstyled/styled-components'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import setDate from 'date-fns/setDate'

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

export default DayItem
