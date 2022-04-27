import _ from 'lodash'
import { ImageType } from '../types/TaskType'

const getSize = (path: string) => {
  if (typeof path !== 'string') return

  let image = new Image()
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    image.onerror = () => reject(new Error(`Could not load image at ${path}`))
    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight })

    image.src = path
  })
}

type Fn = (
  data:
    | Omit<ImageType, 'height' | 'width'>
    | Omit<ImageType, 'height' | 'width'>[]
) => Promise<ImageType | ImageType[] | undefined>

const getImageDimensions: Fn = async (data) => {
  if (_.isArray(data)) {
    const imagesWithSize = await Promise.all(
      data.map(async (img) => {
        if (img) {
          const size = await getSize(img.path)

          if (size) {
            return {
              ...img,
              height: size.height,
              width: size.width,
            } as ImageType
          }
        }

        return img
      })
    )

    return imagesWithSize
  } else {
    const size = await getSize(data.path)
    return {
      ...data,
      ...size,
    }
  }
}

export default getImageDimensions
