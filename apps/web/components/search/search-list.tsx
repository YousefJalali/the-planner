import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useSearch } from '@the-planner/data'
import { EmptyState, NoSearchDataSvg } from '../ui'
import ViewTask from '../task/view-task'
import { SearchedTask } from '../task/task-item'
import TaskItemSearchPlaceholder from '../task/task-item/task-item-search-placeholder'

const SearchList = ({ query }: { query: string }) => {
  const { searchedTasks, isLoading } = useSearch(query)

  return isLoading ? (
    <ul className="space-y-4">
      {new Array(5).fill(0).map((ele, i) => (
        <TaskItemSearchPlaceholder />
      ))}
    </ul>
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
                  <ViewTask task={data[index]}>
                    {(showModal) => (
                      <button onClick={showModal} className="w-full text-left">
                        <SearchedTask task={data[index]} />
                      </button>
                    )}
                  </ViewTask>
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
