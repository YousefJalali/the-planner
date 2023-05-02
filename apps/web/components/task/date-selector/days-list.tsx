import { forwardRef } from 'react'

type Props = {
  date: string
  children: JSX.Element[]
}

const DaysList = forwardRef<HTMLUListElement, Props>(
  ({ date, children }, ref) => (
    <ul
      ref={ref}
      aria-labelledby="days"
      className="mt-4 space-x-2 flex overflow-x-scroll px-6"
      data-date={date}
    >
      {children}
    </ul>
  )
)

DaysList.displayName = 'DaysList'

export default DaysList
