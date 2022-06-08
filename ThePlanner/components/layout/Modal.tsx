import { DragEventHandler, FC, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, Variants, PanInfo } from 'framer-motion'
import { useModal } from '../../common/contexts/ModalCtx'
import useWindowSize from '../../common/hooks/useWindowSize'
import styled, { x } from '@xstyled/styled-components'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

type Props = {}

const Motion = styled(motion(x.div))`
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: layout-level0;

  position: absolute;
  bottom: 0;
  width: 100%;
`

export const Backdrop = ({
  id,
  onClick,
}: {
  id: string
  onClick?: () => void
}) => {
  const backdropVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  }

  return (
    <motion.div
      transition={{ duration: 0.3 }}
      initial='closed'
      animate='open'
      exit='closed'
      variants={backdropVariants}
    >
      <x.div
        id={`${id}-backdrop`}
        position='absolute'
        top={0}
        left={0}
        h='100vh'
        w='100vw'
        backgroundColor='rgba(0, 0, 0, 0.5)'
        onClick={onClick}
      />
    </motion.div>
  )
}

const ContentWrapper = ({
  id,
  clearModal,
  children,
  fullScreen = false,
}: {
  id: string
  clearModal: () => void
  children: JSX.Element | JSX.Element[]
  fullScreen?: boolean
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

  const onDragHandler = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const childHeight = targetRef.current?.getBoundingClientRect().height

    if (childHeight && info.point.y > childHeight) {
      clearModal()
    } else {
      return
    }
  }

  return height ? (
    <x.div
      position='absolute'
      top={0}
      left={0}
      zIndex={998}
      h={height}
      w={width}
    >
      <Backdrop id={id} onClick={clearModal} />

      <Motion
        transition={{ type: 'tween', duration: 0.3 }}
        initial='closed'
        animate='open'
        exit='closed'
        variants={variants}
        // drag='y'
        // dragConstraints={{ bottom: 0, top: 0 }}
        // dragElastic={0.2}
        // // @ts-ignore
        // onDragEnd={onDragHandler}
        ref={targetRef}
        id={id}
        data-testid={id}
        maxHeight={fullScreen ? '100%' : 'calc(100% - 48px)'}
        borderRadius={fullScreen ? 0 : '3 3 0 0'}
      >
        {children}
      </Motion>
    </x.div>
  ) : null
}

const Modal: FC<Props> = () => {
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
