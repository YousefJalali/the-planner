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
    <li
      onClick={() => onClick(day)}
      className={`flex flex-col items-center min-w-[3rem] rounded-lg border border-base-300 p-2 cursor-pointer select-none ${
        active
          ? 'bg-primary'
          : isToday(setDate(new Date(date), day))
          ? 'bg-base-200'
          : 'transparent'
      }`}
      data-active={active ? true : null}
    >
      <span
        className={`font-bold ${
          active ? 'text-primary-content' : 'text-neutral'
        } mb-2`}
      >
        {day}
      </span>
      <span
        className={`text-xs ${active ? 'text-primary-content' : 'opacity-60'}`}
      >
        {format(setDate(new Date(date), day), 'EE')}
      </span>
    </li>
  )
}

export default DayItem
