import { Image } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'

const {
  hostname: cloud_name,
  username: api_key,
  password: api_secret,
} = new URL(process.env.CLOUDINARY_URL as string)

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
})

const uploadImage = async (path: string, folderName: string) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { folder: folderName },
      function (error, result) {
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
      }
    )
  })

export const uploadImages = async (paths: string[], folderName: string) => {
  try {
    return {
      images: await Promise.all(
        paths.map(async (path) => await uploadImage(path, folderName))
      ),
    }
  } catch (error) {
    return { error }
  }
}

export const deleteImages = async (ids: string[]) =>
  new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(ids, function (error, result) {
      if (error) reject({ error })

      if (result) resolve(result)
    })
  })
