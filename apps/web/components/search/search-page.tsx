import { x } from '@xstyled/styled-components'
import Head from 'next/head'
import { useState } from 'react'

import { useSearch } from '@the-planner/data'

import { NoSearchDataSvg, EmptyState } from '@the-planner/ui-web'

import SearchHistory from './search-history'
import SearchList from './search-list'
import SearchLoading from './search-loading'
import RecentTasks from './recent-tasks-list'
import SearchInput from './search-input'
import { useSearchHistory } from '@the-planner/hooks'

export const SearchPage = () => {
  const [val, setVal] = useState('')
  const { searchedTasks, isLoading } = useSearch(val)

  const { handler } = useSearchHistory()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <x.main h="100vh" pb={4}>
        <x.section px={4}>
          <x.span
            text="body.large"
            display="block"
            w="calc(100% - 48px)"
            lineHeight="normal"
          >
            What task or project are you looking for?
          </x.span>

          <SearchInput
            value={val}
            onChange={(e) => setVal(e.target.value)}
            autoFocus
            onKeyDown={(e) => handler(e)}
          />
        </x.section>

        {val.length <= 0 ? (
          <>
            <SearchHistory onSearchItemClick={setVal} />
            <RecentTasks />
          </>
        ) : isLoading ? (
          <x.div m="0 auto" w="fit-content" my={3}>
            <SearchLoading />
          </x.div>
        ) : searchedTasks?.length > 0 ? (
          <x.section p={3} h="100%" flex="1 1 auto">
            <SearchList data={searchedTasks} />
          </x.section>
        ) : (
          <EmptyState
            illustration={<NoSearchDataSvg />}
            title=" No data found"
            description="Try other words"
            size="20%"
          />
        )}
      </x.main>
    </>
  )
}

export default SearchPage
