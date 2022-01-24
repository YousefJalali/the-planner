import { Plus } from 'lucide-react'
import styled from 'styled-components'
import useToggle from '../common/hooks/useToggle'
import Modal from './layout/Modal'
import CreateTask from './task/TaskForm'

const Button = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  height: 48px;
  width: 48px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.brand.primary};
  box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.25);
  border: 0;
  z-index: 888;

  > svg {
    stroke: ${(props) => props.theme.colors.layout.level0};
  }
`

const FloatingButton = () => {
  const [modal, setModal] = useToggle()

  const openModalHandler = () => {
    setModal(true)
  }
  const closeModalHandler = () => {
    setModal(false)
  }

  const onSubmitHandler = () => {
    console.log('submitted')
  }
  return (
    <>
      <Button onClick={openModalHandler}>
        <Plus height={32} width={32} />
      </Button>
      {modal && (
        <Modal
          title='Create task'
          onClose={closeModalHandler}
          fullScreen
          withHeader
        >
          <CreateTask onSubmit={onSubmitHandler} />
        </Modal>
      )}
    </>
  )
}

export default FloatingButton
