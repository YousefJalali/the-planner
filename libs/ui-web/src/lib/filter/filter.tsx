import { FC } from 'react'
import { ScrollableList } from '@the-planner/ui-web'
import FilterItem from './filter-item'
import { FilterType } from '@the-planner/types'

type Props = {
  items: FilterType[]
  active: FilterType
  setActive: (s: FilterType) => void
}

export const Filter: FC<Props> = ({ items, active, setActive }) => {
  const onClickHandler = (s: FilterType) => {
    setActive(s)
  }

  return (
    <ScrollableList spaceX={2} p="0 !important">
      {items.map((item) => (
        <FilterItem
          key={item.value}
          active={active.value === item.value}
          onClick={() => onClickHandler(item)}
        >
          {item.alias}
        </FilterItem>
      ))}
    </ScrollableList>
  )
}

export default Filter
