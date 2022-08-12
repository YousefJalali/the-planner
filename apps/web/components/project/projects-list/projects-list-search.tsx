import { Fieldset, Input } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { ChangeEventHandler, memo } from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
  value: string
  onChange: ChangeEventHandler
}

export const Search = memo(({ value, onChange }: Props) => {
  return (
    <x.div px={3} pb={3} position="sticky" top="0" zIndex="1000">
      <Fieldset label="search" hideLabel leftIcon={<FiSearch />}>
        <Input
          type="search"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
      </Fieldset>
    </x.div>
  )
})

export default Search
