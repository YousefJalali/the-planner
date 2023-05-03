import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react'

export type ModalType = {
  id: string
  content: JSX.Element | JSX.Element[]
  closeButton?: boolean
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

  const clearModalHandler = useCallback(
    (id: string) => {
      setModal((modals) => modals.filter((modal) => modal.id !== id))
    },
    [setModal]
  )

  const setModalHandler = useCallback(
    (newModal: ModalType) => {
      setModal((modals) => [...modals, newModal])
    },
    [setModal]
  )

  const value = {
    modals,
    setModal: setModalHandler,
    clearModal: clearModalHandler,
  }

  const context = useMemo(() => ({ ...value }), [value])

  return <ModalCtx.Provider value={context}>{children}</ModalCtx.Provider>
}

export const useModal = () => {
  const { modals, setModal, clearModal } = useContext(ModalCtx)

  return useMemo(
    () => ({ modals, setModal, clearModal }),
    [modals, setModal, clearModal]
  )
}

export default ModalCtx
