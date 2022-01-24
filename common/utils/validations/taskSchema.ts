import * as yup from 'yup'

const task = yup.object().shape({
  title: yup.string().required('title:Title is required'),
})

export default task
