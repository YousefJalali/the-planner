import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export type ImgType = {
  id: string
  name: string
  path: string
}

const readFile = (file: File) => {
  if (!(file instanceof File)) return

  let fileReader = new FileReader()
  return new Promise<string>((resolve, reject) => {
    //in case of error
    fileReader.onerror = () => {
      fileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }

    fileReader.onload = () => resolve(fileReader.result as string)

    fileReader.readAsDataURL(file)
  })
}

const getSize = (path: string) => {
  let image = new Image()
  image.src = path

  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    image.onerror = () => {
      reject(new DOMException('Problem getting the size.'))
    }

    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
  })
}

const getBlobUrl = async (uploadedFiles: FileList | File[]) => {
  const files: File[] = _.values(uploadedFiles)

  try {
    const images = await Promise.all(
      files.map(async (file) => {
        const path = await readFile(file)

        if (typeof path === 'string') {
          // const startTime = performance.now()
          // const size = await getSize(path)
          // const endTime = performance.now()
          // console.log(
          //   `Call to doSomething took ${endTime - startTime} milliseconds`
          // )
          // console.log(size)

          const img: ImgType = {
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
    console.log('onChange error: ', error)
  }
}

export default getBlobUrl
