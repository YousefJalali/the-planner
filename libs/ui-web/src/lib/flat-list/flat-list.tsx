import { x } from '@xstyled/styled-components'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

type Props<T> = {
  data: T[]
  itemHeight: number
  children: (data: T) => JSX.Element | JSX.Element[]
}

export function FlatList<T extends { id: string }>({
  data,
  itemHeight,
  children,
}: Props<T>) {
  return (
    <AutoSizer>
      {({ width }) => {
        return (
          <List
            innerElementType="ul"
            itemData={data}
            itemCount={data.length}
            itemSize={itemHeight}
            height={data.length * itemHeight + itemHeight}
            width={width}
          >
            {({ data, index, style }) => {
              return (
                <x.li
                  key={data[index].id}
                  style={style}
                  borderBottom="1px solid"
                  borderColor="layout-level0accent"
                >
                  {children(data[index])}
                </x.li>
              )
            }}
          </List>
        )
      }}
    </AutoSizer>
  )
}

export default FlatList
