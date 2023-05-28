import { CSSProperties, ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMedia } from '@the-planner/hooks'

export const Modal = ({
  isOpen,
  dismiss,
  children,
  id,
  style,
  closesWhenClickedOutside,
  closeButton = false,
}: {
  isOpen: boolean
  dismiss: () => void
  children: ReactNode
  id: string
  style?: CSSProperties
  closesWhenClickedOutside?: boolean
  closeButton?: boolean
}) => {
  const isMobile = useMedia('(max-width: 768px)')
  const targetRef = useRef<HTMLDivElement>(null)

  if (typeof window === 'undefined') return null

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
    <AnimatePresence>
      {isOpen && (
        <>
          {createPortal(
            <div className="modal modal-open modal-bottom transition-none sm:modal-middle">
              {closesWhenClickedOutside && (
                <div
                  className="absolute top-0 left-0 h-full w-full"
                  onClick={dismiss}
                />
              )}

              <motion.div
                ref={targetRef}
                className="relative modal-box z-50 transition-none p-0 max-h-full bg-transparent rounded-none lg:rounded-2xl lg:max-h-[calc(100%-32px)]"
                id={`${id}-modal`}
                variants={variants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <div className="bg-base-100 mt-12 relative rounded-2xl lg:mt-0">
                  {closeButton && (
                    <button
                      className="btn btn-sm btn-circle btn-outline absolute right-2 top-2"
                      onClick={dismiss}
                    >
                      ✕
                    </button>
                  )}
                  {children}
                </div>
              </motion.div>
            </div>,
            document.getElementById('modal') as HTMLDivElement
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
