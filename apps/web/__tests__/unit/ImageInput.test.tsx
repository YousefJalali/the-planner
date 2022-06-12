import { render } from '../../test-utils'
import ImageInput from '../../components/formElements/ImageInput'
import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ImageType } from '@the-planner/types'
import { act } from 'react-dom/test-utils'

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

  const id = 'test-image-input'

  const utils = render(
    <ImageInput
      value={value}
      onChange={onChange}
      max={max}
      multiple={multiple}
      id={id}
    />
  )

  const input = utils.getByTestId(id, {
    exact: true,
  }) as HTMLInputElement

  const previews = () => utils.queryAllByAltText(/preview-/i)
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
  test('preview image', () => {
    const img: ImageType = {
      id: 'test',
      name: 'test-image',
      path: 'https://picsum.photos/200/300',
      width: 200,
      height: 300,
    }

    const utils = setup({ value: [img] })

    expect(utils.previews()[0]).toHaveAttribute('alt', 'preview-1')
  })

  // test('Upload one file', async () => {
  //   const file = [new File(['hello'], 'hello.png', { type: 'image/png' })]

  //   const { input, onChange, previews } = setup({})

  //   act(() => {
  //     userEvent.upload(input, file)
  //   })

  //   console.log(previews())

  // expect(previews()[0]).toBeInTheDocument()
  // const uploadedFile = await getBlobUrl(file)
  // if (uploadedFile) {

  //   await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

  //   await waitFor(() =>
  //     expect(onChange).toHaveBeenCalledWith(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           name: uploadedFile[0].name,
  //           path: uploadedFile[0].path,
  //         }),
  //       ])
  //     )
  //   )
  // }
  // })

  //test upload multiple files
  // test('Upload multiple file', async () => {
  //   const files = [
  //     new File(['hello'], 'hello.png', { type: 'image/png' }),
  //     new File(['there'], 'there.png', { type: 'image/png' }),
  //   ]

  //   const { input, onChange } = setup({ multiple: true })

  //   const filesPaths = await getBlobUrl(files)

  //   if (filesPaths) {
  //     userEvent.upload(input, files)

  //     await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

  //     await waitFor(() =>
  //       expect(onChange).toHaveBeenCalledWith(
  //         expect.arrayContaining([
  //           expect.objectContaining({
  //             name: filesPaths[0].name,
  //             path: filesPaths[0].path,
  //           }),
  //           expect.objectContaining({
  //             name: filesPaths[1].name,
  //             path: filesPaths[1].path,
  //           }),
  //         ])
  //       )
  //     )
  //   }
  // })

  //test preview
  // test('preview images', async () => {
  //   const value = [
  //     { id: uuidv4(), name: 'test-1', path: 'somewhere' },
  //     { id: uuidv4(), name: 'test-2', path: 'somewhere' },
  //   ]

  //   const { previews } = setup({ value })

  //   expect(previews).toHaveLength(2)
  // })

  // //test delete option
  // test('delete image', async () => {
  //   const value = [
  //     { id: uuidv4(), name: 'test-1', path: 'somewhere1' },
  //     { id: uuidv4(), name: 'test-2', path: 'somewhere2' },
  //     { id: uuidv4(), name: 'test-3', path: 'somewhere3' },
  //   ]

  //   const { deleteButtons, onChange } = setup({ value })

  //   userEvent.click(deleteButtons[0])

  //   await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))

  //   //expect the deleted to be filtered
  //   expect(onChange).toHaveBeenCalledWith(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         name: value[1].name,
  //         path: value[1].path,
  //       }),
  //       expect.objectContaining({
  //         name: value[2].name,
  //         path: value[2].path,
  //       }),
  //     ])
  //   )
  // })
})
