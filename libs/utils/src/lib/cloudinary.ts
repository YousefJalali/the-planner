import { Image } from '@prisma/client'
import {
  UploadApiOptions,
  UploadApiResponse,
  UploadResponseCallback,
  // v2 as cloudinary,
} from 'cloudinary'

type UploadFnType = (
  file: string,
  options?: UploadApiOptions,
  callback?: UploadResponseCallback
) => Promise<UploadApiResponse>

export const uploadImageR = async (
  path: string,
  folderName: string,
  fn: UploadFnType
) =>
  new Promise<Image>((resolve, reject) => {
    fn(path, { folder: folderName }, function (error, result) {
      if (error) reject(error)

      if (result) {
        resolve({
          id: result.public_id,
          name: result.public_id,
          path: result.secure_url,
          width: result.width,
          height: result.height,
        })
      }
    })
  })

// export const uploadImage = async (path: string, folderName: string) =>
//   new Promise<Image>((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { folder: folderName },
//       function (error, result) {
//         if (error) reject(error)

//         if (result) {
//           resolve({
//             id: result.public_id,
//             name: result.public_id,
//             path: result.secure_url,
//             width: result.width,
//             height: result.height,
//           })
//         }
//       }
//     )
//   })

export const uploadImages = async (
  paths: string[],
  projectId: string,
  taskId: string,
  uploadFn: UploadFnType
) => {
  try {
    return {
      images: await Promise.all(
        paths.map(
          async (path) =>
            await uploadImageR(path, `${projectId}/${taskId}`, uploadFn)
        )
      ),
    }
  } catch (error) {
    return { error }
  }
}

// export const deleteImages = async (ids: string[]) =>
//   new Promise((resolve, reject) => {
//     cloudinary.api.delete_resources(ids, function (error, result) {
//       if (error) reject({ error })

//       if (result) resolve(result)
//     })
//   })

// export const deleteWholeProject = async (projectId: string) =>
//   new Promise((resolve, reject) => {
//     cloudinary.api.delete_resources_by_prefix(
//       `${projectId}/`,
//       function (error, result) {
//         if (error) reject({ error })

//         if (result) resolve(result)
//       }
//     )
//   })

// export const deleteWholeTask = async (projectId: string, taskId: string) =>
//   new Promise((resolve, reject) => {
//     cloudinary.api.delete_resources_by_prefix(
//       `${projectId}/${taskId}/`,
//       function (error, result) {
//         if (error) reject({ error })

//         if (result) resolve(result)
//       }
//     )
//   })
