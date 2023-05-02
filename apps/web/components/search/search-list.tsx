import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import SearchItem from './search-item'
import { TaskWithProject } from '@the-planner/types'

type Props = {
  data: TaskWithProject[]
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
            itemSize={96 + 16}
            height={height || 0}
            width={width || 0}
          >
            {({ data, index, style }) => {
              return (
                <i key={data[index].id} style={style}>
                  <SearchItem item={data[index]} />
                </i>
              )
            }}
          </List>
        )
      }}
    </AutoSizer>
  )
}

export default SearchList
