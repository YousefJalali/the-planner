import { DragEventHandler, FC, memo, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuid } from 'uuid'
import { AnimatePresence, motion, Variants, PanInfo } from 'framer-motion'
import { useWindowSize, useModal } from '@the-planner/hooks'
import styled, { x } from '@xstyled/styled-components'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { Backdrop, ModalHeader } from '@the-planner/ui-web'

const Motion = styled(motion(x.div))`
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: layout-level0;

  position: absolute;
  bottom: 0;
  width: 100%;
`

const ContentWrapper = memo(
  ({
    id,
    clearModal,
    children,
    fullScreen = false,
    title,
  }: {
    id: string
    clearModal: () => void
    children: JSX.Element | JSX.Element[]
    fullScreen?: boolean
    title?: string | JSX.Element
  }) => {
    const { height, width } = useWindowSize()

    const targetRef = useRef<HTMLDivElement>(null)

    const modal = document.getElementById('modal') as HTMLDivElement

    useEffect(() => {
      if (targetRef) {
        if (targetRef.current) {
          if (id) {
            disableBodyScroll(targetRef.current)
          } else {
            enableBodyScroll(targetRef.current)
          }
        }

        return () => {
          if (!modal?.firstChild) {
            clearAllBodyScrollLocks()
          }
        }
      }
    }, [id, height, modal])

    const variants = useMemo<Variants>(() => {
      return {
        open: {
          opacity: 1,
          y: 0,
        },
        closed: { opacity: 1, y: height },
      }
    }, [height])

    // const onDragHandler = (
    //   event: MouseEvent | TouchEvent | PointerEvent,
    //   info: PanInfo
    // ) => {
    //   const childHeight = targetRef.current?.getBoundingClientRect().height

    //   if (childHeight && info.point.y > childHeight) {
    //     clearModal()
    //   } else {
    //     return
    //   }
    // }

    const generatedId = uuid()

    return height ? (
      <x.div
        position="absolute"
        top={0}
        left={0}
        zIndex={998}
        h={height}
        w={width}
      >
        <Backdrop id={`${id}-backdrop-${generatedId}`} onClick={clearModal} />

        <Motion
          transition={{ type: 'tween', duration: 0.3 }}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          // drag='y'
          // dragConstraints={{ bottom: 0, top: 0 }}
          // dragElastic={0.2}
          // // @ts-ignore
          // onDragEnd={onDragHandler}
          ref={targetRef}
          id={`${id}-modal-${generatedId}`}
          data-testid={`${id}-modal-${generatedId}`}
          maxHeight={fullScreen ? '100%' : 'calc(100% - 48px)'}
          borderRadius={fullScreen ? 0 : '3 3 0 0'}
        >
          {!title ? null : typeof title === 'string' ? (
            <ModalHeader onRequestClose={clearModal} p={3}>
              {title}
            </ModalHeader>
          ) : (
            title
          )}

          {children}
        </Motion>
      </x.div>
    ) : null
  }
)

export const Modal: FC = () => {
  const { modals, clearModal } = useModal()

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
                fullScreen={modal.fullScreen}
                title={modal.title}
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
