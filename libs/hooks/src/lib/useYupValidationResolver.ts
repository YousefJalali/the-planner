import { useCallback } from 'react'
import { InferType, ObjectSchema } from 'yup'
import {
  FieldErrors,
  Resolver,
  ResolverError,
  ResolverSuccess,
} from 'react-hook-form'

export const useYupValidationResolver = <T>(
  //@ts-ignore
  validationSchema: ObjectSchema<T>
) =>
  //@ts-ignore
  useCallback<Resolver<T>>(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
          //@ts-ignore
        } as ResolverSuccess<T>
      } catch (errors) {
        return {
          values: {},
          //@ts-ignore
          errors: (errors as FieldErrors).inner.reduce(
            (allErrors: FieldErrors, currentError: FieldErrors) => ({
              ...allErrors,
              //@ts-ignore
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
          //@ts-ignore
        } as ResolverError<T>
      }
    },
    [validationSchema]
  )

export const apiYupValidation = async <T>(
  //@ts-ignore
  validationSchema: ObjectSchema<T>,
  data: T
) => {
  try {
    const values = await validationSchema.validate(data, {
      abortEarly: false,
    })

    return {
      values,
      errors: {},
    }
  } catch (errors) {
    return {
      values: {},
      //@ts-ignore
      errors: (errors as FieldErrors).inner.reduce(
        (allErrors: FieldErrors, currentError: FieldErrors) => ({
          ...allErrors,
          //@ts-ignore
          [currentError.path]: {
            type: currentError.type ?? 'validation',
            message: currentError.message,
          },
        }),
        {}
      ),
    }
  }
}

export default useYupValidationResolver
// import { useCallback } from 'react'
// import { InferType } from 'yup'
// import { FieldErrors, FieldError, ResolverError } from 'react-hook-form'
// import { TypedSchema } from 'yup/lib/util/types'

// type Props<T> = {
//   // validationSchema: T
// } & InferType<T & TypedSchema>

// function useYupValidationResolver<T>({ validationSchema }: Props<T>) {
//   // return useCallback<(data: T) => Promise<ResolverError>>(
//   return useCallback(
//     async (data) => {
//       try {
//         const values = await validationSchema.validate(data, {
//           abortEarly: false,
//         })

//         return {
//           values,
//           errors: {},
//         }
//       } catch (errors) {
//         return {
//           values: {},
//           errors: (errors as FieldErrors).inner.reduce(
//             (allErrors: FieldErrors, currentError: FieldError) => {
//               console.log('current error', currentError)

//               return {
//                 ...allErrors,
//                 [currentError.path]: {
//                   type: currentError.type ?? 'validation',
//                   message: currentError.message,
//                 },
//               }
//             },
//             {}
//           ),
//         }
//       }
//     },
//     [validationSchema]
//   )
// }

// export default useYupValidationResolver
