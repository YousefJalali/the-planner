import { x } from '@xstyled/styled-components'
import { KeyboardEvent, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FiClock, FiSearch, FiX } from 'react-icons/fi'
import { useModal } from '../common/contexts/ModalCtx'
import useRecentTasks from '../common/data/useRecentTasks'
import useSearch from '../common/data/useSearch'
import { TaskWithProjectType } from '../common/types/TaskType'
import NoSearchData from '../styles/illustrations/NoSearchData'
import FormHeader from './form/FormHeader'
import Fieldset from './formElements/Fieldset'
import Spinner from './Spinner'
import SearchedTask from './task/SearchedTask'
import TaskDetails from './task/TaskDetails'

//helper function
const replaceAt = (array: string[], index: number, value: string) => {
  const ret = array.slice(0)
  ret[index] = value
  return ret
}

const Search = ({ onRequestClose }: { onRequestClose: () => void }) => {
  const [val, setVal] = useState('')
  const [cookie, setCookie] = useCookies(['search-history'])

  const { searchedTasks, isLoading } = useSearch(val)
  const { recentTasks } = useRecentTasks()

  const { setModal, clearModal } = useModal()

  const onDetails = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

  //handle cookies history
  const onEnterClickHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchHistory = cookie['search-history'] || []
      const updateSearchHistory =
        searchHistory.length < 5
          ? [...searchHistory, (e.target as HTMLInputElement).value]
          : replaceAt(searchHistory, 0, (e.target as HTMLInputElement).value)

      setCookie('search-history', JSON.stringify(updateSearchHistory), {
        path: '/search',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      })
    }
  }

  const removeFromSearchHistory = (item: string) => {
    setCookie(
      'search-history',
      JSON.stringify(
        cookie['search-history'].filter((ex: string) => ex !== item)
      ),
      {
        path: '/search',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      }
    )
  }

  return (
    <x.div h='100vh' py={4}>
      <x.section px={4}>
        <FormHeader title='Search' onRequestClose={onRequestClose} />
        <x.span
          text='body.large'
          display='block'
          w='calc(100% - 48px)'
          lineHeight='normal'
        >
          What task or project are you looking for?
        </x.span>

        <x.form mt={3}>
          <Fieldset supportiveText='type a word from task or project title'>
            <x.input
              type='search'
              name='keyword'
              placeholder='Search...'
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => onEnterClickHandler(e)}
              autoComplete='off'
            />
          </Fieldset>
        </x.form>
      </x.section>

      <x.section px={4}>
        {val.length <= 0 ? null : isLoading ? (
          <x.div m='0 auto' w='fit-content' my={3}>
            <Spinner pathColor='brand-primary' trailColor='brand-primary-a10' />
          </x.div>
        ) : searchedTasks?.length > 0 ? (
          <x.ul spaceY={3} py={3}>
            {searchedTasks.map((task) => (
              <x.li key={task.id} onClick={() => onDetails(task)}>
                <SearchedTask task={task} />
              </x.li>
            ))}
          </x.ul>
        ) : (
          <>
            <x.div textAlign='center'>
              <x.div w='30%' m='0 auto' mt={3} mb={2}>
                <NoSearchData />
              </x.div>
              <x.span text='body.small' color='content-subtle'>
                No data found
              </x.span>
            </x.div>

            {/* <ProductsWrapper>
            <ProductsList
              products={popularProducts}
              title='Popular products'
              onClick='/'
            />
          </ProductsWrapper> */}
          </>
        )}
      </x.section>

      {/* <x.section px={4} mt={4}>
        <x.h2 text='body.large' mb={1}>
          Recent tasks
        </x.h2>
        {recentTasks && (
          <x.ul spaceY={3}>
            {recentTasks.map((task) => (
              <x.li key={task.id} onClick={() => onDetails(task)}>
                <SearchedTask task={task} />
              </x.li>
            ))}
          </x.ul>
        )}
      </x.section> */}

      <x.section>
        {val.length <= 0 && (
          <x.div>
            <x.ul>
              {cookie['search-history']?.map((item: string, i: number) => (
                <x.li key={i} display='flex'>
                  <div>
                    <FiClock />
                    <x.a onClick={() => setVal(item)}>{item}</x.a>
                  </div>
                  <x.a onClick={() => removeFromSearchHistory(item)}>
                    <FiX />
                  </x.a>
                </x.li>
              ))}
            </x.ul>

            <x.div px={4} mt={4}>
              <x.h2 text='body.large' mb={1}>
                Recent tasks
              </x.h2>
              {recentTasks && (
                <x.ul spaceY={3}>
                  {recentTasks.map((task) => (
                    <x.li key={task.id} onClick={() => onDetails(task)}>
                      <SearchedTask task={task} />
                    </x.li>
                  ))}
                </x.ul>
              )}
            </x.div>
          </x.div>
        )}
      </x.section>
    </x.div>
  )
}

export default Search
