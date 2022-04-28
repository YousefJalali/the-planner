import { FC, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useModal } from '../../common/contexts/ModalCtx'
import useWindowSize from '../../common/hooks/useWindowSize'
import styled, { css, x } from '@xstyled/styled-components'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

type Props = {}

const Motion = styled(motion.div)<{ fullHeight?: boolean }>`
  max-height: calc(100% - 48px);
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 3 3 0 0;
  background-color: layout-level0;
  /* z-index: 9999; */
  position: absolute;
  bottom: 0;
  width: 100%;

  ${(props) =>
    props.fullHeight &&
    css`
      max-height: 100%;
      border-radius: 0;
    `}
`

const ContentWrapper = ({
  id,
  clearModal,
  children,
  height,
}: {
  id: string
  clearModal: () => void
  children: JSX.Element | JSX.Element[]
  height: number | undefined
}) => {
  const targetRef = useRef<HTMLDivElement>(null)

  const modal = document.getElementById('modal') as HTMLDivElement

  // useEffect(() => {
  //   for (let i = 0; i < modal.children.length; i++) {
  //     ;(modal.children[i] as HTMLElement).style.transform = `translateY(100vh)`
  //   }
  // }, [modal, modal.children.length])

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

  const backdropVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  }

  return height ? (
    <>
      <motion.div
        // key={id}
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
          // zIndex={1001}
          onClick={clearModal}
        />
      </motion.div>

      <Motion
        // key={id}
        transition={{ type: 'tween', duration: 0.3 }}
        initial='closed'
        animate='open'
        exit='closed'
        variants={variants}
        ref={targetRef}
        id={id}
        data-testid={id}
      >
        {children}
      </Motion>
    </>
  ) : null
}

const Modal: FC<Props> = () => {
  const { modals, clearModal } = useModal()
  const { height, width } = useWindowSize()

  if (typeof window === 'undefined') return null

  return (
    <AnimatePresence>
      {modals &&
        modals.length > 0 &&
        modals.map((modal) => (
          <div key={modal.id}>
            {createPortal(
              <x.div
                position='absolute'
                top={0}
                left={0}
                zIndex={998}
                h={height}
                w={width}
              >
                <ContentWrapper
                  id={modal.id}
                  clearModal={() => clearModal(modal.id)}
                  height={height}
                >
                  {modal.content}
                </ContentWrapper>
              </x.div>,
              document.getElementById('modal') as HTMLDivElement
            )}
          </div>
        ))}
    </AnimatePresence>
  )
}

export default Modal
