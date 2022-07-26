import { useModal } from '@the-planner/hooks'
import { x } from '@xstyled/styled-components'
import { ChangeEvent } from 'react'

type ModalType = {
  id: string
  component: JSX.Element
}

type Props = {
  value: string
  onChange: (e: ChangeEvent) => void
  modal: ModalType
  customInput: JSX.Element
  placeholder: string
}

const Select = ({
  value,
  onChange,
  modal,
  customInput,
  placeholder,
}: Props) => {
  const { setModal, clearModal } = useModal()

  const showModal = () => {
    setModal({
      id: modal.id,
      content: modal.component,
    })
  }

  // const Input = customInput || <span />

  return (
    <button onClick={showModal}>
      {value ? <span>{value}</span> : <x.span>{placeholder}</x.span>}
    </button>
  )
}

export default Select
