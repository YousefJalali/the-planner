import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { ProjectType } from '../types/ProjectType'
import { TaskType } from '../types/TaskType'
import useFetchedDateTasks from './useFetchedDateTasks'
import useFetchedProjectById from './useFetchedProjectById'

type Props = {
  date: string | null
}

const useCreateTask = ({ date }: Props) => {
  const router = useRouter()

  const { setProject } = useFetchedProjectById(router.query.projectId as string)

  const { setDateTasks } = useFetchedDateTasks(
    date ? date : new Date().toDateString()
  )

  const createTask = async (task: TaskType) => {
    let error = null
    let data = null

    if (task.date.startDate.toDateString() === date) {
      setDateTasks((data) => {
        if (data) {
          // oldTasks = [...data]
          return [{ ...task }, ...data]
        }
      }, false)
    }

    if (router.query.projectId) {
      setProject((data) => {
        if (data) {
          // oldProject = { ...data }
          return { ...data, tasks: [task, ...data.tasks] } as ProjectType
        }
      }, false)
    }

    try {
      const res = await fetch('/tasks/', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(res)

      if (!res.ok) {
        const statusText = res.statusText
        const { error } = await res.json()

        throw {
          statusText: new Error(statusText),
          error,
        }
      }

      data = (await res.json()) as TaskType
    } catch (err) {
      // console.log('err', JSON.parse(err))
      error = err
    }

    setDateTasks()
    setProject()

    return { data, error }
  }

  return { createTask }
}

export default useCreateTask
// import { useRouter } from 'next/router'
// import { useEffect, useReducer } from 'react'
// import { ProjectType } from '../types/ProjectType'
// import { TaskType } from '../types/TaskType'
// import useFetchedDateTasks from './useFetchedDateTasks'
// import useFetchedProjectById from './useFetchedProjectById'

// type Props = {
//   date: string | null
// }

// type State = {
//   data?: TaskType
//   error?: Error
// }

// type Action =
//   | { type: 'loading' }
//   | { type: 'created'; payload: TaskType }
//   | { type: 'error'; payload: Error }

// const useCreateTask = ({ date }: Props) => {
//   // const initialState: State = {
//   //   error: undefined,
//   //   data: undefined,
//   // }

//   // const reducer = (state: State, action: Action): State => {
//   //   switch (action.type) {
//   //     case 'loading':
//   //       return { ...initialState }
//   //     case 'created':
//   //       return { ...initialState, data: action.payload }
//   //     case 'error':
//   //       return { ...initialState, error: action.payload }
//   //     default:
//   //       return state
//   //   }
//   // }

//   // const [state, dispatch] = useReducer(reducer, initialState)

//   const router = useRouter()

//   const { setProject } = useFetchedProjectById(router.query.projectId as string)

//   const { setDateTasks } = useFetchedDateTasks(
//     date ? date : new Date().toDateString()
//   )

//   const createTask = async (task: TaskType) => {
//     console.log('here')
//     // dispatch({ type: 'loading' })

//     if (task.date.startDate.toDateString() === date) {
//       setDateTasks((data) => {
//         if (data) {
//           // oldTasks = [...data]
//           return [...data, { ...task }]
//         }
//       }, false)
//     }

//     if (router.query.projectId) {
//       setProject((data) => {
//         console.log(data)
//         if (data) {
//           // oldProject = { ...data }
//           return { ...data, tasks: [task, ...data.tasks] } as ProjectType
//         }
//       }, false)
//     }

//     try {
//       const res = await fetch('/tasks/', {
//         method: 'POST',
//         body: JSON.stringify(task),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })

//       if (!res.ok) {
//         throw new Error(res.statusText)
//       }

//       const data = (await res.json()) as TaskType

//       // dispatch({ type: 'created', payload: data })
//     } catch (error) {
//       // dispatch({ type: 'error', payload: error as Error })
//     }
//   }

//   return { data: state.data, error: state.error, createTask }
// }

// export default useCreateTask
