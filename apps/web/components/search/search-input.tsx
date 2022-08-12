import { Fieldset, Input } from '@the-planner/ui-web'
import { InputHTMLAttributes } from 'react'
import { FiSearch } from 'react-icons/fi'

const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Fieldset
      label="search"
      hideLabel
      supportiveText="type a word from title or description"
      leftIcon={<FiSearch />}
    >
      <Input
        {...props}
        type="search"
        name="keyword"
        placeholder="Search..."
        autoComplete="off"
      />
    </Fieldset>
  )
}

export default SearchInput
