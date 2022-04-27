import { FC } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import ModalContent from './ModalContent'

type Props = {
  children: React.ReactNode
  onRequestClose: (action?: any) => void
  isOpen: boolean
  id?: string
  fullHeight?: boolean
  root?: string
}

const ModalAnimation: FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
  id,
  fullHeight,
  root = 'modal',
}) => {
  if (typeof window === 'undefined') return null

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <>
          {createPortal(
            <ModalContent
              isOpen={isOpen}
              onRequestClose={onRequestClose}
              id={id}
              fullHeight={fullHeight}
            >
              {children}
            </ModalContent>,
            document.getElementById(root) as HTMLDivElement
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalAnimation
