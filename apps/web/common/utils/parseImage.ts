import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { ImageType } from '../types/TaskType'

const getPath = (file: File) =>
  new Promise<string>((resolve, reject) => {
    let fileReader = new FileReader()

    fileReader.onerror = () => {
      fileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }

    fileReader.onload = () => {
      const result = fileReader.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new DOMException('Problem parsing input file.'))
      }
    }

    fileReader.readAsDataURL(file)
  })

const getSize = (path: string) => {
  let image = new Image()
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    image.onerror = () => reject(new Error(`Could not load image at ${path}`))
    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight })

    image.src = path
  })
}

const constructImage = async (files: File[]) =>
  await Promise.all(
    files.map(async (file) => {
      const path = await getPath(file)
      const size = await getSize(path)

      return {
        id: uuidv4(),
        name: file.name,
        path,
        height: size.height,
        width: size.width,
      } as ImageType
    })
  )

const parseImage = async (uploadedFiles: FileList | File[]) => {
  if (!(uploadedFiles instanceof File) && !(uploadedFiles instanceof FileList))
    return

  const files: File[] = _.values(uploadedFiles)

  const images = await constructImage(files)

  return _.compact(images)
}

export default parseImage
