import { FC } from 'react'
import { PromptType } from '@the-planner/hooks'

type Props = {
  prompt: PromptType
  clearPrompt: () => void
}

const Prompt: FC<Props> = ({ prompt, clearPrompt }) => {
  return (
    <div className="absolute top-0 left-0 z-[2000] h-screen w-screen">
      {/* <Backdrop id={prompt.id} /> */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10" />

      <div
        data-testid={prompt.id}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[250px] rounded-xl bg-base-100 shadow-xl"
      >
        <div className="p-6">
          <div className="text-left prose w-80 max-w-sm">
            <h3 className="capitalize">{prompt.title}</h3>
            <span>{prompt.message}</span>
          </div>

          <div className="flex gap-2 w-full justify-end mt-6">
            <button
              className="btn btn-ghost"
              type="button"
              name="clear"
              onClick={clearPrompt}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              type="button"
              name="action"
              onClick={() => {
                prompt.actionFn()
                clearPrompt()
              }}
            >
              {prompt.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prompt
