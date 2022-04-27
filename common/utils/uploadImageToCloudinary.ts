import { Image } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'

const uploadImageToCloudinary = async (paths: string[], folderName: string) => {
  const images: Image[] = []

  try {
    await Promise.all(
      paths.map(async (path) => {
        const uploadedPhoto = await cloudinary.uploader.upload(
          path,
          { folder: folderName },
          function (error, result) {
            if (error) {
              throw error
            }
          }
        )

        images.push({
          id: uploadedPhoto.public_id,
          name: uploadedPhoto.public_id,
          path: uploadedPhoto.secure_url,
          width: uploadedPhoto.width,
          height: uploadedPhoto.height,
        })
      })
    )

    return { images }
  } catch (error) {
    return { error }
  }
}

export default uploadImageToCloudinary
