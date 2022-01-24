import { useState } from 'react'
import { useForm, FieldErrors } from 'react-hook-form'
import { mutate } from 'swr'
import CreateTaskFormType from '../types/TaskFormType'
import taskSchema from '../utils/validations/taskSchema'
import validationClient from '../utils/validations/validationClient'
// hook who should:
// --------
// receive form data
// validate it with yup
// send a request with swr
// return [
//   data: fetched data,
//   error: validation errors or server error,
//   loading,
//   submit: function to call on the component (should receive form data as prop)
// ]

const injectErrors = (errors: FieldErrors, setError) => {
  for (let error of errors) {
    setError(error.field, {
      type: 'manual',
      message: error.message,
    })
  }
  return
}

export default function useCreateTask() {
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    title: '',
    project: {
      id: '',
      title: '',
      color: '',
    },
    isOpen: false,
    startDate: new Date().toString(),
    endDate: new Date().toString(),
    description: '',
    attachments: [''],
  }

  const { handleSubmit, control, setError, watch } =
    useForm<CreateTaskFormType>({
      defaultValues,
    })

  const submitHandler = async (data: typeof defaultValues) => {
    //validate data
    const { success, errors } = await validationClient(taskSchema, data)

    if (!success) {
      injectErrors(errors, setError)
    }

    console.log(data)

    // try {
    //   setLoading(true)
    //   const res = await fetch('/api/task/create', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   setLoading(false)

    //   const createdTask = await res.json()

    //   if (!createdTask.success) {
    //     injectErrors(errors, setError)
    //   } else {
    //     mutate('/api/task/create')
    //   }
    // } catch (err) {
    //   //server error
    //   console.log(err)
    // }
  }

  // const submit = () => handleSubmit(submitHandler)

  return [handleSubmit(submitHandler), control, loading, watch]
}
