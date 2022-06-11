import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status } from '../../common/types/TaskType'

const Item = ({
  children,
  onClick,
  active,
}: {
  children: string
  onClick: () => void
  active: boolean
}) => (
  <x.div
    py={1}
    px={3}
    borderRadius={50}
    backgroundColor={active ? 'brand-primary' : 'layout-level0accent'}
    onClick={onClick}
  >
    <x.span
      text='body.small'
      textTransform='capitalize'
      lineHeight='none'
      color={active && 'layout-level0'}
      userSelect='none'
    >
      {children}
    </x.span>
  </x.div>
)

export type filterType = Omit<Status, 'proposed'> | null
type Props = {
  active: filterType
  setActive: (s: filterType) => void
}

const FilterProjects: FC<Props> = ({ active, setActive }) => {
  const onClickHandler = (s: Omit<Status, 'proposed'> | null) => {
    setActive(s)
  }

  return (
    <x.div display='flex' spaceX={2}>
      <Item active={active === null} onClick={() => onClickHandler(null)}>
        all
      </Item>
      <Item
        active={active === Status.INPROGRESS}
        onClick={() => onClickHandler(Status.INPROGRESS)}
      >
        In progress
      </Item>
      <Item
        active={active === Status.COMPLETED}
        onClick={() => onClickHandler(Status.COMPLETED)}
      >
        completed
      </Item>
    </x.div>
  )
}

export default FilterProjects
