import { FC, memo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useModal, useMedia } from '@the-planner/hooks'
// import {
//   disableBodyScroll,
//   enableBodyScroll,
//   clearAllBodyScrollLocks,
// } from 'body-scroll-lock'

const ContentWrapper = memo(
  ({
    id,
    clearModal,
    children,
    closeButton = false,
    isMobile,
    closesWhenClickedOutside,
  }: {
    id: string
    clearModal: () => void
    children: JSX.Element | JSX.Element[]
    closeButton?: boolean
    isMobile: boolean
    closesWhenClickedOutside?: boolean
  }) => {
    // const { height } = useWindowSize()
    const targetRef = useRef<HTMLDivElement>(null)

    // const modal = document.getElementById('modal') as HTMLDivElement
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
    //         console.log('here')
    //         clearAllBodyScrollLocks()
    //       }
    //     }
    //   }
    // }, [id, modal])

    const variants = isMobile
      ? {
          closed: { y: '100%' },
          open: { y: 0 },
          // open: { y: 0, height: height * 0.9 },
        }
      : {
          closed: { scale: 0, opacity: 0 },
          open: { scale: 1, opacity: 1 },
        }

    return (
      <div
        className="modal modal-open modal-bottom transition-none sm:modal-middle"
        // style={style}
      >
        {closesWhenClickedOutside && (
          <div
            className="absolute top-0 left-0 h-full w-full"
            onClick={clearModal}
          />
        )}

        <motion.div
          ref={targetRef}
          className="relative modal-box z-50 transition-none p-0 max-h-[calc(100%-5em)]"
          id={`${id}-modal`}
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ type: 'tween', duration: 0.2 }}
          // style={{ maxHeight: height ? `calc(${height} - 5em)` : undefined }}
        >
          {closeButton && (
            <button
              className="btn btn-sm btn-circle btn-outline absolute right-2 top-2"
              onClick={clearModal}
            >
              ✕
            </button>
          )}
          {children}
        </motion.div>
      </div>
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
          <div key={modal.id}>
            {createPortal(
              <ContentWrapper
                id={modal.id}
                clearModal={() => clearModal(modal.id)}
                closeButton={modal.closeButton}
                isMobile={isMobile}
                closesWhenClickedOutside={modal.closesWhenClickedOutside}
              >
                {modal.content}
              </ContentWrapper>,
              document.getElementById('modal') as HTMLDivElement
            )}
          </div>
        ))}
    </AnimatePresence>
  )
}

export default Modal
