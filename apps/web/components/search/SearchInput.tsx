import { x } from '@xstyled/styled-components'
import { FiSearch } from 'react-icons/fi'
import { useModal } from '@the-planner/hooks'
import Search from './Search'
import { Button } from '@the-planner/ui-web'

const SearchInput = () => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    setModal({
      id: 'search-modal',
      fullScreen: true,
      content: <Search onRequestClose={() => clearModal('search-modal')} />,
    })
  }

  return (
    <Button name="search" variant="textOnly" onClick={clickHandler}>
      <x.span fontSize="1.5rem" color="content-contrast">
        <FiSearch />
      </x.span>
    </Button>
  )
}

export default SearchInput
