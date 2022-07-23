import { Fieldset, Input } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { InputHTMLAttributes, KeyboardEvent } from 'react'
import { useCookies } from 'react-cookie'
import { FiSearch } from 'react-icons/fi'

const replaceAt = (array: string[], index: number, value: string) => {
  const ret = array.slice(0)
  ret[index] = value
  return ret
}

const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [cookie, setCookie] = useCookies(['search-history'])

  //handle cookies history
  const onEnterClickHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('here')

      e.preventDefault()
      const searchHistory = cookie['search-history'] || []
      const updateSearchHistory =
        searchHistory.length < 5
          ? [...searchHistory, (e.target as HTMLInputElement).value]
          : replaceAt(searchHistory, 0, (e.target as HTMLInputElement).value)

      setCookie('search-history', JSON.stringify(updateSearchHistory), {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      })
    }
  }

  return (
    <x.form>
      <Fieldset
        label="search"
        hideLabel
        supportiveText="type a word from task or project title"
        leftIcon={<FiSearch />}
      >
        <Input
          {...props}
          type="search"
          name="keyword"
          placeholder="Search..."
          autoComplete="off"
          onKeyDown={(e) => onEnterClickHandler(e)}
        />
      </Fieldset>
    </x.form>
  )
}

export default SearchInput
