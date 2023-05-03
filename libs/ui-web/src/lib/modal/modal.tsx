import { FC, memo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useWindowSize, useModal, useMedia } from '@the-planner/hooks'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

const ContentWrapper = memo(
  ({
    id,
    clearModal,
    children,
    fullScreen = false,
    title,
    isMobile,
  }: {
    id: string
    clearModal: () => void
    children: JSX.Element | JSX.Element[]
    fullScreen?: boolean
    title?: string | JSX.Element
    isMobile: boolean
  }) => {
    const { height } = useWindowSize()

    const targetRef = useRef<HTMLDivElement>(null)

    const modal = document.getElementById('modal') as HTMLDivElement

    // useEffect(() => {
    //   if (targetRef) {
    //     if (targetRef.current) {
    //       if (id) {
    //         disableBodyScroll(targetRef.current)
    //       } else {
    //         enableBodyScroll(targetRef.current)
    //       }
    //     }

    //     return () => {
    //       if (!modal?.firstChild) {
    //         clearAllBodyScrollLocks()
    //       }
    //     }
    //   }
    // }, [id, height, modal])

    const variants = isMobile
      ? {
          closed: { y: '100%' },
          open: { y: 0 },
        }
      : {
          closed: { scale: 0.5, opacity: 0 },
          open: { scale: 1, opacity: 1 },
        }

    return (
      <motion.div
        className="modal modal-open modal-bottom transition-none sm:modal-middle"
        // style={style}
      >
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-black"
          onClick={clearModal}
          variants={{
            closed: { opacity: 0 },
            open: { opacity: 0.1 },
          }}
          transition={{ duration: 0.2 }}
          initial="closed"
          animate="open"
          exit="closed"
        />

        <motion.div
          ref={targetRef}
          className="modal-box z-50 transition-none p-0"
          id={`${id}-box`}
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <div id={id}>{children}</div>
        </motion.div>
      </motion.div>
    )
  }
)

export const Modal: FC = () => {
  const { modals, clearModal } = useModal()
  const isMobile = useMedia('(max-width: 768px)')

  if (typeof window === 'undefined') return null

  return (
    <AnimatePresence>
      {modals &&
        modals.length > 0 &&
        modals.map((modal) => (
          <>
            {createPortal(
              <ContentWrapper
                id={modal.id}
                clearModal={() => clearModal(modal.id)}
                fullScreen={modal.fullScreen}
                title={modal.title}
                isMobile={isMobile}
              >
                {modal.content}
              </ContentWrapper>,
              document.getElementById('modal') as HTMLDivElement
            )}
          </>
        ))}
    </AnimatePresence>
  )
}

export default Modal
