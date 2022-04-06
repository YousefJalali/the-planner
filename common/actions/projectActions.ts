import { APIErrorType } from '../types/APIErrorType'
import { ProjectType } from '../types/ProjectType'

export const createProject = async (
  formData: ProjectType,
  onSuccess: () => void,
  onError: (error: APIErrorType) => void
) => {
  try {
    const res = await fetch('/projects/', {
      method: 'POST',
      body: JSON.stringify({ project: formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { error, data } = await res.json()

    if (error) {
      onError({
        status: res.status,
        info: error,
      } as APIErrorType)
    }

    if (data) {
      onSuccess()
    }
  } catch (error) {
    console.log(error)
  }
}
