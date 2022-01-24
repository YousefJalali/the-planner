const validationClient = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false })

    return { success: true }
  } catch (err) {
    const errors = err.errors.map((e) => ({
      field: e.split(':')[0],
      message: e.split(':')[1],
    }))
    return { success: false, errors }
  }
}

export default validationClient
