import { ChangeEventHandler, memo } from 'react'

type Props = {
  value: string
  onChange: ChangeEventHandler
}

export const Search = memo(({ value, onChange }: Props) => {
  return (
    <div className="m-3 pt-3 sticky top-0 z-50">
      <input
        type="search"
        name="keyword"
        placeholder="Search..."
        autoComplete="off"
        className="input input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  )
})

export default Search
