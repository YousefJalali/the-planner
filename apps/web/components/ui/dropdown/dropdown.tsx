import { createPopper } from '@popperjs/core'
import { ReactNode, useEffect, useRef } from 'react'

export const Dropdown = ({
  children,
  btnComp,
  className,
}: {
  children: ReactNode
  btnComp: ReactNode
  className?: string
}) => {
  const buttonRef = useRef<HTMLLabelElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (buttonRef.current && menuRef.current) {
      createPopper(buttonRef.current, menuRef.current, {
        placement: 'bottom-end',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              padding: 8,
            },
          },
        ],
      })
    }
  }, [])

  return (
    <div className="dropdown">
      <label ref={buttonRef} tabIndex={0} className={className}>
        {btnComp}
      </label>
      {/* <div ref={buttonRef}>Click</div> */}
      <div
        ref={menuRef}
        tabIndex={0}
        className="dropdown-content shadow bg-base-100 rounded-box max-w-[18rem] overflow-hidden"
      >
        {children}
      </div>
    </div>
  )
}

export default Dropdown
