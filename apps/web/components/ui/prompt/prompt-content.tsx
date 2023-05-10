import { FC } from 'react'
import { PromptType } from '@the-planner/hooks'

type Props = {
  prompt: PromptType
  clearPrompt: () => void
}

const Prompt: FC<Props> = ({ prompt, clearPrompt }) => {
  return (
    <div className="absolute top-0 left-0 z-[100] h-screen w-screen">
      {/* <Backdrop id={prompt.id} /> */}

      <div
        data-testid={prompt.id}
        className="fixed top-1/2 left-1/2 min-w-[250px] rounded-lg bg-base-100"
      >
        <div>
          <div className="flex flex-col justify-center items-center p-3 prose">
            <h3>{prompt.title}</h3>
            <span>{prompt.message}</span>
          </div>

          <div className="divider" />

          <div className="flex divide-x-1">
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
