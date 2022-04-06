import { createContext, useState } from 'react'
import { TaskType } from '../types/TaskType'

type ContextType = {
  activeTask: TaskType | null
  setActiveTask: (task: TaskType) => void
  clearActiveTask: () => void
}

const ActiveTaskCtx = createContext<ContextType>({
  activeTask: null,
  setActiveTask: (task) => {},
  clearActiveTask: () => {},
})

type Props = {
  children: JSX.Element | JSX.Element[]
}

export function ActiveTaskCtxProvider({ children }: Props) {
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)

  const setActiveTaskHandler = (task: TaskType) => {
    setActiveTask(task)
  }

  const clearActiveTaskHandler = () => {
    setActiveTask(null)
  }

  const context = {
    activeTask,
    setActiveTask: setActiveTaskHandler,
    clearActiveTask: clearActiveTaskHandler,
  }

  return (
    <ActiveTaskCtx.Provider value={context}>{children}</ActiveTaskCtx.Provider>
  )
}

export default ActiveTaskCtx
