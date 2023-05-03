import { FiSearch } from 'react-icons/fi'
import { useModal } from '@the-planner/hooks'
import { SearchPage } from './'

export const SearchButton = () => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    setModal({
      id: 'search-modal',
      closeButton: true,
      content: <SearchPage />,
    })
  }

  return (
    <button
      name="search"
      className="btn btn-ghost btn-circle"
      onClick={clickHandler}
    >
      <FiSearch size={24} />
    </button>
  )
}

export default SearchButton
