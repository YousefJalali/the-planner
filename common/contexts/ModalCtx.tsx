import { createContext, useState, ReactNode, useContext } from 'react'

export type ModalType = {
  id: string
  content: JSX.Element | JSX.Element[]
  fullScreen?: boolean
}

type ModalContext = {
  modals: ModalType[]
  setModal: (newModal: ModalType) => void
  clearModal: (id: string) => void
}

const ModalCtx = createContext<ModalContext>({
  modals: [],
  setModal: (newModal) => {},
  clearModal: (id) => {},
})

export const ModalCtxProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | ReactNode
}) => {
  const [modals, setModal] = useState<ModalType[]>([])

  const clearModalHandler = (id: string) => {
    setModal((modals) => modals.filter((n) => n.id !== id))
  }

  const setModalHandler = (newModal: ModalType) => {
    setModal((modals) => [...modals, newModal])
  }

  const context = {
    modals,
    setModal: setModalHandler,
    clearModal: clearModalHandler,
  }

  return <ModalCtx.Provider value={context}>{children}</ModalCtx.Provider>
}

export const useModal = () => {
  const { modals, setModal, clearModal } = useContext(ModalCtx)

  return { modals, setModal, clearModal }
}

export default ModalCtx
