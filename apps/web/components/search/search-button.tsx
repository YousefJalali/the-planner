import { x } from '@xstyled/styled-components'
import { FiSearch } from 'react-icons/fi'
import { useModal } from '@the-planner/hooks'
import { SearchPage } from './'
import { Button, ModalHeader } from '@the-planner/ui-web'
import { useMemo } from 'react'

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

  const content = useMemo(
    () => (
      <x.span fontSize="1.5rem" color="content-contrast">
        <FiSearch />
      </x.span>
    ),
    []
  )

  return (
    <Button name="search" variant="textOnly" onClick={clickHandler}>
      {content}
    </Button>
  )
}

export default SearchButton
