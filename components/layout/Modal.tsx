import { FC, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import useLockBodyScroll from '../../common/hooks/useLockBodyScroll'
import useWindowSize from '../../common/hooks/useWindowSize'
import Modal from '../../styles/components/ModalStyle'

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
  const windowSize = useWindowSize()

  return typeof window !== 'undefined'
    ? isOpen
      ? ReactDOM.createPortal(
          <Modal.Container windowSize={windowSize}>
            <Modal.Overlay onClick={onRequestClose} />
            <Modal.Content centered={centered}>
              <Modal.Child>{children}</Modal.Child>
            </Modal.Content>
          </Modal.Container>,
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
