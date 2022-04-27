import { createContext, useContext, useState } from 'react'
import { TaskWithProjectType } from '../types/TaskType'

type ContextType = {
  activeTask: TaskWithProjectType | null
  setActiveTask: (task: TaskWithProjectType) => void
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
  const [activeTask, setActiveTask] = useState<TaskWithProjectType | null>(null)

  const setActiveTaskHandler = (task: TaskWithProjectType) => {
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

export const useActiveTask = () => {
  const { activeTask, setActiveTask, clearActiveTask } =
    useContext(ActiveTaskCtx)

  return { activeTask, setActiveTask, clearActiveTask }
}

export default ActiveTaskCtx
