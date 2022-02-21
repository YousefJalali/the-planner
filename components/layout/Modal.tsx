import { x } from '@xstyled/styled-components'
import { FC, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import useLockBodyScroll from '../../common/hooks/useLockBodyScroll'
import useWindowSize from '../../common/hooks/useWindowSize'

type Props = {
  children: React.ReactNode
  onRequestClose: () => void
  centered?: boolean
  isOpen: boolean
}

const ModalComp: FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
  centered,
}) => {
  // useLockBodyScroll()
  const { width, height } = useWindowSize()

  return typeof window !== 'undefined'
    ? isOpen
      ? ReactDOM.createPortal(
          <x.div
            position='absolute'
            top={0}
            left={0}
            zIndex={998}
            // w='100vw'
            // h='100vh'
            h={height}
            w={width}
          >
            {/* Overlay */}
            <x.div
              position='absolute'
              top={0}
              left={0}
              h='100vh'
              w='100vw'
              backgroundColor='rgba(0, 0, 0, 0.5)'
              zIndex={999}
              onClick={onRequestClose}
            />

            {/* Child Wrapper */}
            <x.div
              position='absolute'
              bottom={0}
              left={0}
              w='100%'
              zIndex={1000}
              maxHeight='calc(100% - 72px)'
              borderRadius='3 3 0 0'
              overflowX='hidden'
              overflowY='scroll'
              backgroundColor='layout-level0'
            >
              {children}
            </x.div>
          </x.div>,
          document.getElementById('modal')!
        )
      : null
    : null
}

export default ModalComp
// import { FC, useRef } from 'react'
// import ReactDOM from 'react-dom'
// import useLockBodyScroll from '../../../common/hooks/useLockBodyScroll'
// import useWindowSize from '../../../common/hooks/useWindowSize'
// import Modal from '../../../styles/components/ModalStyle'
// import useScrollPosition from '../../../common/hooks/useScrollPosition'
// import ModalHeader from './ModalHeader'

// type Props = {
//   children: React.ReactNode
//   onClose: () => void
//   title?: string
//   centered?: boolean
//   fullScreen?: boolean
//   withHeader?: boolean
// }

// const ModalComp: FC<Props> = ({
//   children,
//   onClose,
//   title,
//   centered,
//   fullScreen,
//   withHeader,
// }) => {
//   useLockBodyScroll()
//   const windowSize = useWindowSize()
//   const ref = useRef(null)
//   const [scrollTop] = useScrollPosition(ref)

//   return typeof window !== 'undefined'
//     ? ReactDOM.createPortal(
//         <Modal.Container windowSize={windowSize}>
//           {!fullScreen && <Modal.Overlay onClick={onClose} />}
//           <Modal.Content
//             centered={centered}
//             fullScreen={fullScreen}
//             withHeader={withHeader}
//           >
//             {title && (
//               <ModalHeader scroll={scrollTop} title={title} onClose={onClose} />
//             )}
//             <Modal.Child
//               fullScreen={fullScreen}
//               withHeader={withHeader}
//               ref={ref}
//             >
//               {children}
//             </Modal.Child>
//           </Modal.Content>
//         </Modal.Container>,
//         document.getElementById('modal')!
//       )
//     : null
// }

// export default ModalComp
