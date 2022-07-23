import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import SearchItem from './search-item'
import { x } from '@xstyled/styled-components'
import { TaskWithProjectType } from '@the-planner/types'

type Props = {
  data: TaskWithProjectType[]
}

const SearchList = ({ data }: Props) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <List
            innerElementType="ul"
            itemData={data}
            itemCount={data.length}
            itemSize={85 + 8}
            height={height}
            width={width}
          >
            {({ data, index, style }) => {
              return (
                <x.li key={data[index].id} style={style}>
                  <SearchItem item={data[index]} />
                </x.li>
              )
            }}
          </List>
        )
      }}
    </AutoSizer>
  )
}

export default SearchList