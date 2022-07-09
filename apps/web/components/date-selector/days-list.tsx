import { ScrollableList } from '@the-planner/ui-web'
import { forwardRef } from 'react'

type Props = {
  date: string
  children: JSX.Element[]
}

const DaysList = forwardRef<HTMLUListElement, Props>(
  ({ date, children }, ref) => (
    <ScrollableList
      ref={ref}
      aria-labelledby="days"
      mt={2}
      spaceX={2}
      data-date={date}
    >
      {children}
    </ScrollableList>
  )
)

DaysList.displayName = 'DaysList'

export default DaysList
