import { Plus } from 'lucide-react'
import styled from 'styled-components'
import useToggle from '../common/hooks/useToggle'
import FormWithHeader from './FormWithHeader'
import Modal from './layout/Modal'
import CreateTask from './task/CreateTask'
// import Modal from 'react-modal'

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

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    stroke: ${(props) => props.theme.colors.layout.level0};
  }
`
// if (typeof window !== 'undefined') {
//   Modal.setAppElement('body')
// }

const FloatingButton = () => {
  const [modal, setModal] = useToggle()

  const openModalHandler = () => {
    setModal(true)
  }
  const closeModalHandler = () => {
    setModal(false)
  }

  const customStyles = {
    content: {
      top: 48,
      left: 0,
      right: 0,
      bottom: 0,
      marginRight: 0,
      padding: 0,
      border: 0,
      backgroundColor: 'transparent',
      // transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  }

  return (
    <>
      <Button onClick={openModalHandler}>
        <Plus height={32} width={32} />
      </Button>

      <Modal isOpen={modal} onRequestClose={closeModalHandler}>
        <FormWithHeader
          title='Create task'
          onClose={closeModalHandler}
          id='create-task-form'
        >
          <CreateTask onClose={closeModalHandler} />
        </FormWithHeader>
      </Modal>
    </>
  )
}

export default FloatingButton
