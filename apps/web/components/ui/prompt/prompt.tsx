import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'

export const Prompt = ({
  isOpen,
  dismiss,
  id,
  title,
  message,
  action,
  actionFn,
  loading,
}: {
  isOpen: boolean
  dismiss: () => void
  id: string
  title: string
  message: string
  action: string
  actionFn: () => void
  loading?: boolean
}) => {
  if (typeof window === 'undefined') return null

  //   const actionHandler = () => {
  // actionFn()
  //     dismiss()
  //   }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {createPortal(
            <div className="absolute top-0 left-0 z-[2000] h-screen w-screen">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" />

              <div
                data-testid={id}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[250px] w-[calc(100%-3rem)] max-w-md rounded-xl bg-base-100 shadow-xl"
              >
                <div className="p-6">
                  <div className="text-left prose w-full">
                    <h3>{title}</h3>
                    <span>{message}</span>
                  </div>

                  <div className="flex gap-2 w-full justify-end mt-6">
                    <button
                      className="btn btn-ghost"
                      type="button"
                      name="clear"
                      onClick={dismiss}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-error"
                      type="button"
                      name="action"
                      onClick={() => {
                        actionFn()
                        dismiss()
                      }}
                    >
                      {action}
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.getElementById('prompt') as HTMLDivElement
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default Prompt
