import { render } from '../../test-utils'
import ImageInput from '../../components/formElements/ImageInput'
import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import getBlobUrl from '../../common/utils/getBlobUrl'
import { ImageType } from '../../common/types/ImageType'
import Img from '../../public/83.jpeg'

// const createFile = async () => {
//   let response = await fetch('https://picsum.photos/200/300')
//   let data = await response.blob()
//   let metadata = {
//     type: 'image/jpeg',
//   }
//   return new File([data], 'test.jpg', metadata)
// }

function setup({
  value = [],
  max = 10,
  multiple = false,
}: {
  value?: ImageType[]
  max?: number
  multiple?: boolean
}) {
  const onChange: (e: ChangeEvent<HTMLInputElement> | ImageType[]) => void =
    jest.fn()

  const utils = render(
    <ImageInput
      value={value}
      onChange={onChange}
      max={max}
      multiple={multiple}
    />
  )

  const input = utils.getByTestId(/image-input/i, {
    exact: false,
  }) as HTMLInputElement

  const previews = utils.queryAllByAltText(/preview-/i)
  const deleteButtons = utils.queryAllByTestId(/delete/i)

  return {
    ...utils,
    input,
    value,
    onChange,
    previews,
    deleteButtons,
  }
}

// jest.setTimeout(30000)

//test upload a single file
describe('Image input', () => {
  test('Upload one file', async () => {
    // const file = [new File(['hello'], 'hello.png', { type: 'image/png' })]

    // const file = await createFile()

    const contentType = 'image/jpeg'
    const blob = 'hello'

    const file = [
      new File([blob], 'hello.png', {
        type: contentType,
        lastModified: +new Date(),
      }),
    ]

    const { input, onChange } = setup({})

    const uploadedFile = await getBlobUrl(file)

    if (uploadedFile) {
      userEvent.upload(input, file)

      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(onChange).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              name: uploadedFile[0].name,
              path: uploadedFile[0].path,
            }),
          ])
        )
      )
    }
  })

  //test upload multiple files
  test('Upload multiple file', async () => {
    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['there'], 'there.png', { type: 'image/png' }),
    ]

    const { input, onChange } = setup({ multiple: true })

    const filesPaths = await getBlobUrl(files)

    if (filesPaths) {
      userEvent.upload(input, files)

      await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(onChange).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              name: filesPaths[0].name,
              path: filesPaths[0].path,
            }),
            expect.objectContaining({
              name: filesPaths[1].name,
              path: filesPaths[1].path,
            }),
          ])
        )
      )
    }
  })

  //test preview
  test('preview images', async () => {
    const value = [
      { id: uuidv4(), name: 'test-1', path: 'somewhere' },
      { id: uuidv4(), name: 'test-2', path: 'somewhere' },
    ]

    const { previews } = setup({ value })

    expect(previews).toHaveLength(2)
  })

  //test delete option
  test('delete image', async () => {
    const value = [
      { id: uuidv4(), name: 'test-1', path: 'somewhere1' },
      { id: uuidv4(), name: 'test-2', path: 'somewhere2' },
      { id: uuidv4(), name: 'test-3', path: 'somewhere3' },
    ]

    const { deleteButtons, onChange } = setup({ value })

    userEvent.click(deleteButtons[0])

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

    //expect the deleted to be filtered
    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: value[1].name,
          path: value[1].path,
        }),
        expect.objectContaining({
          name: value[2].name,
          path: value[2].path,
        }),
      ])
    )
  })
})
