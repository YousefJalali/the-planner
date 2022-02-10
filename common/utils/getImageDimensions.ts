import _ from 'lodash'
import { ImageType } from '../types/ImageType'

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

const getImageDimensions = async (data: ImageType | ImageType[]) => {
  if (_.isArray(data)) {
    // const dataWithSize = []
    // for (let img of data) {
    //   const size = await getSize(img.path)
    //   dataWithSize.push({ ...img, ...size })
    // }

    const imagesWithSize = await Promise.all(
      data.map(async (img) => {
        if (img) {
          const size = await getSize(img.path)

          if (size) {
            return {
              ...img,
              height: size.height,
              width: size.width,
            }
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
