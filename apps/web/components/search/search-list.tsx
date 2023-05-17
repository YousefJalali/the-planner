import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import SearchItem from './search-item'
import { useSearch } from '@the-planner/data'
import { EmptyState, NoSearchDataSvg } from '../ui'

const SearchList = ({ query }: { query: string }) => {
  const { searchedTasks, isLoading } = useSearch(query)

  return isLoading ? (
    <div>Loading ...</div>
  ) : searchedTasks.length > 0 ? (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <List
            innerElementType="ul"
            itemData={searchedTasks}
            itemCount={searchedTasks.length}
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
  ) : (
    <EmptyState
      illustration={<NoSearchDataSvg />}
      title=" No data found"
      description="Try other words"
      size="20%"
    />
  )
}

export default SearchList
