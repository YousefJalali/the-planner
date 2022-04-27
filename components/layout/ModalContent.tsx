import styled, { css, x } from '@xstyled/styled-components'
import { FC, useEffect, useMemo, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import useWindowSize from '../../common/hooks/useWindowSize'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

type Props = {
  children: React.ReactNode
  onRequestClose: (action?: any) => void
  isOpen: boolean
  id?: string
  fullHeight?: boolean
}

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

const ModalContent: FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
  id,
  fullHeight = false,
}) => {
  const { height, width } = useWindowSize()

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
        if (isOpen) {
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
  }, [isOpen, height, modal])

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
    <x.div
      position='absolute'
      top={0}
      left={0}
      zIndex={998}
      h={height}
      w={width}
    >
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
          // zIndex={1001}
          onClick={onRequestClose}
        />
      </motion.div>

      <Motion
        transition={{ type: 'tween', duration: 0.3 }}
        initial='closed'
        animate='open'
        exit='closed'
        variants={variants}
        ref={targetRef}
        id={id}
        data-testid={id}
        fullHeight={fullHeight}
      >
        {children}
      </Motion>
    </x.div>
  ) : null
}

export default ModalContent

//    Overlay
//   <x.div
//   position='absolute'
//   top={0}
//   left={0}
//   h='100vh'
//   w='100vw'
//   backgroundColor='rgba(0, 0, 0, 0.5)'
//   // zIndex={999}
//   onClick={onRequestClose}
// />
// import { x } from '@xstyled/styled-components'
// import { FC, useEffect, useMemo, useRef } from 'react'
// import { createPortal } from 'react-dom'
// import { AnimatePresence, motion, Variants } from 'framer-motion'
// import useWindowSize from '../../common/hooks/useWindowSize'
// import useElementSize from '../../common/hooks/useElementSize'
// import useLockBodyScroll from '../../common/hooks/useLockBodyScroll'

// type Props = {
//   children: React.ReactNode
//   onRequestClose: (action?: any) => void
//   centered?: boolean
//   isOpen: boolean
// }

// const ModalComp: FC<Props> = ({
//   children,
//   isOpen,
//   onRequestClose,
//   centered,
// }) => {
//   const { height, width } = useWindowSize()
//   const [childRef, { height: eleHeight, width: eleWidth }] = useElementSize()

//   const variants = useMemo<Variants>(() => {
//     return {
//       open: {
//         opacity: 1,
//         y:
//           eleHeight && height
//             ? height - eleHeight < 0
//               ? 24
//               : height - eleHeight
//             : 0,
//       },
//       closed: { opacity: 1, y: height },
//     }
//   }, [eleHeight, height])

//   const backdropVariants = {
//     open: {
//       opacity: 1,
//     },
//     closed: {
//       opacity: 0,
//     },
//   }

//   if (typeof window === 'undefined') return null

//   return createPortal(
//     <AnimatePresence exitBeforeEnter>
//       {isOpen && (
//         <x.div
//           position='absolute'
//           top={0}
//           left={0}
//           zIndex={998}
//           h={height}
//           w={width}
//         >
//           <motion.div
//             transition={{ type: 'spring', duration: 0.5 }}
//             initial='closed'
//             animate='open'
//             exit='closed'
//             variants={backdropVariants}
//           >
//             <x.div
//               position='absolute'
//               top={0}
//               left={0}
//               h='100vh'
//               w='100vw'
//               backgroundColor='rgba(0, 0, 0, 0.5)'
//               // zIndex={999}
//               onClick={onRequestClose}
//             />
//           </motion.div>

//           <motion.div
//             transition={{ type: 'spring', duration: 0.5 }}
//             initial='closed'
//             animate='open'
//             exit='closed'
//             variants={variants}
//           >
//             <x.div
//               ref={childRef}
//               position='relative'
//               // position='absolute'
//               // bottom={0}
//               // left={0}
//               w='100%'
//               // zIndex={1000}
//               // maxHeight='calc(100% - 72px)'
//               borderRadius='3 3 0 0'
//               overflowX='hidden'
//               overflowY='scroll'
//               backgroundColor='layout-level0'
//             >
//               {children}
//             </x.div>
//           </motion.div>
//         </x.div>
//       )}
//     </AnimatePresence>,
//     document.getElementById('modal')!
//   )
// }

// export default ModalComp
