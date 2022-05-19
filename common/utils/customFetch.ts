import getErrorMessage from './getErrorMessage'

async function customFetch<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  bodyData?: T
) {
  const res = await fetch(url, {
    method,
    ...(bodyData && { body: JSON.stringify(bodyData) }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const err = new Error(res.statusText)
    const { error } = await res.json()
    err.message = error
    throw getErrorMessage(err)
  }

  return await res.json()
}
// async function customFetch<T>(
//   url: string,
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE',
//   bodyData?: T
// ) {
//   try {
//     const res = await fetch(url, {
//       method,
//       ...(bodyData && { body: JSON.stringify(bodyData) }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     if (!res.ok) {
//       throw new Error(res.statusText)
//     }

//     return await res.json()
//   } catch (err) {
//     return { error: getErrorMessage(err) }
//   }
// }

export default customFetch
