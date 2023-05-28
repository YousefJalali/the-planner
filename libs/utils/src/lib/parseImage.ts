import { v4 as uuidv4 } from 'uuid'
import { Attachment } from '@the-planner/types'
import compact from 'lodash-es/compact'

const getPath = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()

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

const getDimensions = (path: string) => {
  const image = new Image()
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
      const dimensions = await getDimensions(path)

      return {
        id: uuidv4(),
        name: file.name,
        path,
        height: dimensions.height,
        width: dimensions.width,
      } as Attachment
    })
  )

export const parseImage = async (uploadedFiles: FileList | File[]) => {
  if (!(uploadedFiles instanceof File) && !(uploadedFiles instanceof FileList))
    return

  const files: File[] = Object.values(uploadedFiles)

  const images = await constructImage(files)

  return compact(images)
}

export default parseImage
