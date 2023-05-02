import { FiSearch } from 'react-icons/fi'
import { useModal } from '@the-planner/hooks'
import { SearchPage } from './'

export const SearchButton = () => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    setModal({
      id: 'search-modal',
      fullScreen: true,
      content: (
        <>
          <button
            className="btn btn-sm btn-circle btn-outline absolute right-2 top-2"
            onClick={() => clearModal('search-modal')}
          >
            ✕
          </button>
          <SearchPage />
        </>
      ),
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
