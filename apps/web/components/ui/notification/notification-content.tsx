import { FC, useMemo } from 'react'
import { v4 as uuid } from 'uuid'

import { NotificationType } from '@the-planner/hooks'
import {
  FiAlertTriangle,
  FiCheck,
  FiInfo,
  FiX,
  FiXCircle,
} from 'react-icons/fi'
import {
  TbAlertTriangle,
  TbCircleCheck,
  TbCircleX,
  TbInfoCircle,
} from 'react-icons/tb'
import { Spinner } from '../'

type Props = {
  notification: NotificationType
  clearNotification: () => void
}

const Notification: FC<Props> = ({ notification, clearNotification }) => {
  const id = notification.id || uuid()

  const variants = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  }
  const icons = {
    info: <TbInfoCircle size={24} />,
    success: <TbCircleCheck size={24} />,
    warning: <TbAlertTriangle size={24} />,
    error: <TbCircleX size={24} />,
  }

  return (
    <div className="toast mb-3 w-full min-w-0 px-6 md:max-w-lg">
      <div className={`alert ${variants[notification.variant]}`}>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 ">
            <span>{icons[notification.variant]}</span>

            <span className="first-letter:uppercase">
              <span className="line-clamp-2">{notification.message}</span>
            </span>
          </div>

          {notification.loading ? (
            <div data-testid={`${id}-loading`}>
              <Spinner />
            </div>
          ) : (
            <>
              <button
                onClick={notification.actionFn}
                data-testid={`${id}-action`}
              >
                {notification.action}
              </button>

              <button
                onClick={clearNotification}
                data-testid={`${notification.id}-close`}
                className="btn-ghost btn-sm btn-circle btn -mr-2"
              >
                <FiX />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div
  //     transition={{ type: 'spring', duration: 0.3 }}
  //     initial="closed"
  //     animate="open"
  //     exit="closed"
  //     variants={variants}
  //     data-testid={id}
  //   >
  //     <x.div
  //       backgroundColor="layout-level2accent"
  //       borderRadius={2}
  //       display="flex"
  //       h={36}
  //     >
  //       <x.div display="flex" alignItems="center" h="100%">
  //         <x.div
  //           backgroundColor={`utility-${notification.variant}`}
  //           px={2}
  //           h="100%"
  //           display="flex"
  //           alignItems="center"
  //         >
  //           <x.span color="layout-level0">
  //             {notification.variant === 'confirmation' ? (
  //               <FiCheck />
  //             ) : notification.variant === 'warning' ? (
  //               <FiAlertTriangle />
  //             ) : notification.variant === 'critical' ? (
  //               <FiXCircle />
  //             ) : (
  //               <FiInfo />
  //             )}
  //           </x.span>
  //         </x.div>
  //       </x.div>

  //       <x.div
  //         display="flex"
  //         justifyContent="space-between"
  //         alignItems="center"
  //         w="calc(100% - 32px)"
  //         px={2}
  //       >
  //         <x.span
  //           text="body.small"
  //           color="content-default"
  //           textTransform={{ firstLetter: 'uppercase' }}
  //           textOverflow="ellipsis"
  //           overflow="hidden"
  //           whiteSpace="nowrap"
  //           minWidth={0}
  //         >
  //           {notification.message}
  //         </x.span>

  //         <x.div
  //           display="flex"
  //           alignItems="center"
  //           justifyContent="flex-end"
  //           ml={2}
  //         >
  //           {notification.loading ? (
  //             <x.div data-testid={`${id}-loading`}>
  //               <Spinner
  //                 pathColor="content-subtle"
  //                 trailColor="layout-level0accent"
  //               />
  //             </x.div>
  //           ) : (
  //             <>
  //               <x.a
  //                 onClick={notification.actionFn}
  //                 text="body.small"
  //                 textDecoration="underline"
  //                 data-testid={`${id}-action`}
  //                 mx={2}
  //                 whiteSpace="nowrap"
  //               >
  //                 {notification.action}
  //               </x.a>

  //               <x.a
  //                 onClick={clearNotification}
  //                 data-testid={`${notification.id}-close`}
  //                 color="content-subtle"
  //               >
  //                 <FiX />
  //               </x.a>
  //             </>
  //           )}
  //         </x.div>
  //       </x.div>
  //     </x.div>
  //   </div>
  // )
}

export default Notification
