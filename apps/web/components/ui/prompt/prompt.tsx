import { FC } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import { usePrompt } from '@the-planner/hooks'
import PromptContent from './prompt-content'

export const Prompt: FC = () => {
  const { prompt, clearPrompt } = usePrompt()

  if (typeof window === 'undefined') return null

  return (
    <AnimatePresence exitBeforeEnter>
      {prompt && (
        <>
          {createPortal(
            <PromptContent prompt={prompt} clearPrompt={clearPrompt} />,
            document.getElementById('prompt') as HTMLDivElement
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default Prompt
