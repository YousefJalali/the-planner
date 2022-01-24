import { FC, useRef } from 'react'
import ReactDOM from 'react-dom'
import useLockBodyScroll from '../../common/hooks/useLockBodyScroll'
import useWindowSize from '../../common/hooks/useWindowSize'
import { Headline } from '../../styles'
import { XCircle } from 'lucide-react'
import Modal from '../../styles/components/ModalStyle'
import useScrollPosition from '../../common/hooks/useScrollPosition'

type Props = {
  children: React.ReactNode
  onClose: () => void
  title?: string
  centered?: boolean
  fullScreen?: boolean
  withHeader?: boolean
}

const ModalComp: FC<Props> = ({
  children,
  onClose,
  title,
  centered,
  fullScreen,
  withHeader,
}) => {
  useLockBodyScroll()
  const windowSize = useWindowSize()
  const ref = useRef(null)
  const [scrollTop] = useScrollPosition(ref)

  return typeof window !== 'undefined'
    ? ReactDOM.createPortal(
        <Modal.Container windowSize={windowSize}>
          {!fullScreen && <Modal.Overlay onClick={onClose} />}
          <Modal.Content
            centered={centered}
            fullScreen={fullScreen}
            withHeader={withHeader}
          >
            {title && (
              <Modal.Header scrolling={scrollTop > 0}>
                <Headline as='h2' level='three'>
                  {title}
                </Headline>

                {!centered && <XCircle onClick={onClose} />}
              </Modal.Header>
            )}
            <Modal.Child
              fullScreen={fullScreen}
              withHeader={withHeader}
              ref={ref}
            >
              {children}
            </Modal.Child>
          </Modal.Content>
        </Modal.Container>,
        document.getElementById('modal')!
      )
    : null
}

export default ModalComp
