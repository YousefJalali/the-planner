import { useCallback } from 'react'
import { InferType, ObjectSchema } from 'yup'
import {
  FieldErrors,
  Resolver,
  ResolverError,
  ResolverSuccess,
} from 'react-hook-form'
import { TypedSchema } from 'yup/lib/util/types'

const useYupValidationResolver = <T>(
  validationSchema: ObjectSchema<T & InferType<T & TypedSchema>>
) =>
  useCallback<Resolver<T>>(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        } as ResolverSuccess<T>
      } catch (errors) {
        return {
          values: {},
          errors: (errors as FieldErrors).inner.reduce(
            (allErrors: FieldErrors, currentError: FieldErrors) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        } as ResolverError<T>
      }
    },
    [validationSchema]
  )

export const apiYupValidation = async <T>(
  validationSchema: ObjectSchema<T & InferType<T & TypedSchema>>,
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
      errors: (errors as FieldErrors).inner.reduce(
        (allErrors: FieldErrors, currentError: FieldErrors) => ({
          ...allErrors,
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
