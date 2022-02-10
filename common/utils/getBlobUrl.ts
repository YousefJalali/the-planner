import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { ImageType } from '../types/ImageType'

const readFile = (file: File) => {
  if (!(file instanceof File)) return

  let fileReader = new FileReader()
  return new Promise<string>((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }

    fileReader.onload = () => resolve(fileReader.result as string)

    fileReader.readAsDataURL(file)
  })
}

const getBlobUrl = async (uploadedFiles: FileList | File[]) => {
  const files: File[] = _.values(uploadedFiles)

  try {
    const images = await Promise.all(
      files.map(async (file) => {
        const path = await readFile(file)

        if (typeof path === 'string') {
          const img: ImageType = {
            id: uuidv4(),
            name: file.name,
            path,
          }
          return img
        }
      })
    )

    return _.compact(images)
  } catch (error) {
    console.log('getBlobUrl error: ', error)
  }
}

export default getBlobUrl
