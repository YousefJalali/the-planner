import styled, { x, css } from '@xstyled/styled-components'
import { FC } from 'react'

const Item = styled(x.div)<{ active?: boolean }>`
  padding: 1 3;
  /* border: 1px solid;
  border-color: brand-primary; */
  border-radius: 50;
  background-color: layout-level0accent;

  > span {
    text-transform: capitalize;
    line-height: 1;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: brand-primary;
      > span {
        color: layout-level0;
      }
    `};
`

type Props = {
  active: string
  setActive: (s: 'all' | 'ongoing' | 'completed') => void
}

const FilterProjects: FC<Props> = ({ active, setActive }) => {
  const onClickHandler = (s: 'all' | 'ongoing' | 'completed') => {
    setActive(s)
  }

  return (
    <x.div display='flex' spaceX={2}>
      <Item active={active === 'all'} onClick={() => onClickHandler('all')}>
        <x.span text='body.small'>all</x.span>
      </Item>
      <Item
        active={active === 'ongoing'}
        onClick={() => onClickHandler('ongoing')}
      >
        <x.span text='body.small'>In progress</x.span>
      </Item>
      <Item
        active={active === 'completed'}
        onClick={() => onClickHandler('completed')}
      >
        <x.span text='body.small'>completed</x.span>
      </Item>
    </x.div>
  )
}

export default FilterProjects
