import { FiSearch } from 'react-icons/fi'
import { SearchPage } from './'
import { useState } from 'react'
import { Modal } from '../ui'

export const SearchButton = () => {
  const [modal, showModal] = useState(false)

  return (
    <>
      <button
        name="search"
        className="btn btn-sm btn-ghost btn-circle lg:hidden"
        onClick={() => showModal(true)}
      >
        <FiSearch size={24} />
      </button>
      <input
        readOnly
        type="search"
        placeholder="Search..."
        className="input input-bordered hidden lg:block"
        onClick={() => showModal(true)}
      />

      <Modal
        id="search-modal"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <SearchPage />
      </Modal>
    </>
  )
}

export default SearchButton
