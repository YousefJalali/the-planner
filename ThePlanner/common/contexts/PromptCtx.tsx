import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'

export type PromptType = {
  id: string
  title: string
  message: string
  action: string
  actionFn: () => void
  loading?: boolean
}

type PromptContext = {
  prompt: PromptType | null
  setPrompt: (promptData: PromptType) => void
  clearPrompt: () => void
}

const PromptCtx = createContext<PromptContext>({
  prompt: null,
  setPrompt: (promptData) => {},
  clearPrompt: () => {},
})

export const PromptCtxProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | ReactNode
}) => {
  const [prompt, setPrompt] = useState<PromptType | null>(null)

  const setPromptHandler = (promptData: PromptType) => {
    setPrompt(promptData)
  }

  const clearPromptHandler = () => {
    setPrompt(null)
  }

  // useEffect(() => {
  //   const clear = setTimeout(() => {
  //     clearPromptHandler()
  //   }, 3500)

  //   return () => clearTimeout(clear)
  // }, [prompt])

  const context = {
    prompt,
    setPrompt: setPromptHandler,
    clearPrompt: clearPromptHandler,
  }

  return <PromptCtx.Provider value={context}>{children}</PromptCtx.Provider>
}

export const usePrompt = () => {
  const { prompt, setPrompt, clearPrompt } = useContext(PromptCtx)

  return { prompt, setPrompt, clearPrompt }
}

export default PromptCtx
