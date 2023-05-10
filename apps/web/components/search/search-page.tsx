import { useState } from 'react'

import { useSearch } from '@the-planner/data'

import { NoSearchDataSvg, EmptyState } from '../ui'

import SearchHistory from './search-history'
import SearchList from './search-list'
import RecentTasks from './recent-tasks-list'
import SearchInput from './search-input'
import { useSearchHistory } from '@the-planner/hooks'

export const SearchPage = () => {
  const [val, setVal] = useState('')
  const { searchedTasks, isLoading } = useSearch(val)

  const { handler } = useSearchHistory()

  return (
    <main className="h-screen py-6">
      <section className="px-6 prose">
        <h3 className="w-[calc(100%-2rem)]">
          What task or project are you looking for?
        </h3>

        <SearchInput
          value={val}
          onChange={(e) => setVal(e.target.value)}
          // autoFocus
          onKeyDown={(e) => handler(e)}
        />
      </section>

      {val.length <= 0 ? (
        <>
          <SearchHistory onSearchItemClick={setVal} />
          <RecentTasks />
        </>
      ) : isLoading ? (
        <div className="mx-auto w-fit my-3 not-prose">
          <div>Loading...</div>
        </div>
      ) : searchedTasks?.length > 0 ? (
        <section className="p-6 h-full">
          <SearchList data={searchedTasks} />
        </section>
      ) : (
        <EmptyState
          illustration={<NoSearchDataSvg />}
          title=" No data found"
          description="Try other words"
          size="20%"
        />
      )}
    </main>
  )
}

export default SearchPage
