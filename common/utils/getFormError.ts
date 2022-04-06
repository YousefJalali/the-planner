import { initialDefaultValues } from '../../components/task/TaskForm'

const getFormError = (err: string) => {
  const keys = Object.keys(initialDefaultValues)

  if (keys.some((key) => err.includes(key))) {
    return JSON.parse(err)
  } else {
    return null
  }
}

export default getFormError
