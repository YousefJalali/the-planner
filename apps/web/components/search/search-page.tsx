import { useState } from 'react'

import SearchHistory from './search-history'
import SearchList from './search-list'
import RecentTasks from './recent-tasks-list'
import SearchInput from './search-input'
import { useSearchHistory } from '@the-planner/hooks'

export const SearchPage = () => {
  const [query, setQuery] = useState('')

  const { handler } = useSearchHistory()

  return (
    <main className="py-6 pb-12">
      <section className="px-6 prose pt-6">
        <h3 className="w-[calc(100%-2rem)]">
          Which task or project are you looking for?
        </h3>

        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // autoFocus
          onKeyDown={(e) => handler(e)}
        />
      </section>

      {query.length <= 0 ? (
        <>
          <SearchHistory onSearchItemClick={setQuery} />
          <RecentTasks />
        </>
      ) : (
        <section className="p-6 h-full">
          <SearchList query={query} />
        </section>
      )}
    </main>
  )
}

export default SearchPage
