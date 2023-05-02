import { FiSearch } from 'react-icons/fi'
import { useModal } from '@the-planner/hooks'
import { SearchPage } from './'
import { ModalHeader } from '@the-planner/ui-web'

export const SearchButton = () => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    setModal({
      id: 'search-modal',
      fullScreen: true,
      content: (
        <>
          <ModalHeader onRequestClose={() => clearModal('search-modal')} p={4}>
            Search
          </ModalHeader>
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
