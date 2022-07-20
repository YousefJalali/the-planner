import { Fieldset, Input } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { ChangeEventHandler } from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
  value: string
  onChange: ChangeEventHandler
}

export const Search = ({ value, onChange }: Props) => {
  return (
    <x.div p={3} position="sticky" top="0" zIndex="1000">
      <Fieldset leftIcon={<FiSearch />}>
        <Input
          type="search"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
      </Fieldset>
    </x.div>
  )
}

export default Search
