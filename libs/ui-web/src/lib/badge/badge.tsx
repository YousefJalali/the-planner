import { Status } from '@prisma/client'
import { FC } from 'react'

type Props = {
  children: string
  status: Status
  count?: number
  className?: string
}

export const Badge: FC<Props> = ({ children, status, className, count }) => {
  const color =
    status === Status.PROPOSED
      ? '#935aea'
      : status === Status.INPROGRESS
      ? '#ae9900'
      : '#008f20'

  return (
    <div
      className={`badge badge-ghost gap-2 mb-2 border-0 ${className}`}
      style={{ color, backgroundColor: `${color}30` }}
    >
      {children}
      {count && (
        <div
          className="badge badge-ghost badge-xs text-base-100 border-0"
          style={{ backgroundColor: `${color}` }}
        >
          {count}
        </div>
      )}
    </div>
  )

  // return textOnly ? (
  //   <span className={`capitalize block ${color}`}>• {children}</span>
  // ) : (
  //   <div
  //     className={`rounded-lg w-fit h-fit flex items-center p-2 ${bg}`}
  //     // backgroundColor={`${color}-a20`}
  //     // borderRadius={1}
  //     // w="fit-content"
  //     // h="fit-content"
  //     // display="flex"
  //     // alignItems="center"
  //     // p={1}
  //   >
  //     <span
  //       className={`${count ? 'p-2' : ''} text-xs leading-none ${color}`}
  //       // color={color}
  //       // p={count ? 1 : 0}
  //       // fontSize="xs"
  //       // lineHeight="none"
  //       // letterSpacing={1}
  //     >
  //       {children.toUpperCase()}
  //     </span>

  //     {count && count > 0 ? (
  //       <x.div
  //         backgroundColor={color}
  //         borderRadius="full"
  //         h={14}
  //         w={14}
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <x.span fontSize="50%" color="layout-level0" lineHeight="none">
  //           {+count}
  //         </x.span>
  //       </x.div>
  //     ) : null}
  //   </div>
  // )
}

export default Badge
