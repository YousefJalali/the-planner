import { x } from '@xstyled/styled-components'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import ImgInput from '../../styles/ImageInputStyle'
import { FiX, FiFileText } from 'react-icons/fi'
import { ChangeEvent } from 'react'
import getBlobUrl from '../../common/utils/getBlobUrl'
import { ImageType } from '../../common/types/ImageType'
import getImageDimensions from '../../common/utils/getImageDimensions'
import Icon from '../Icon'

type Props = {
  value: ImageType[]
  onChange: (e: ChangeEvent<HTMLInputElement> | ImageType[]) => void
  max: number
  multiple?: boolean
}

function ImageInput(props: Props) {
  const { value, onChange, max, multiple } = props

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const images = await getBlobUrl(e.target.files)

    if (images) {
      // const imagesWithSizes = await getImageDimensions(images)

      onChange([...value, ...images])
    }
  }

  const onDeleteHandler = (index: number) => {
    onChange(value.filter((img: ImageType, i: number) => i !== index))
  }

  const inputId = uuidv4()

  return (
    <ImgInput.Wrapper>
      {value.length > 0 &&
        value.map((img: ImageType, i: number) => (
          <ImgInput.ImageWrapper key={img.id}>
            <img src={img.path} alt={`preview-${i + 1}`} />
            <ImgInput.DeleteButton
              onClick={() => onDeleteHandler(i)}
              data-testid={`delete-${i + 1}`}
            >
              <FiX height={16} width={16} />
            </ImgInput.DeleteButton>
          </ImgInput.ImageWrapper>
        ))}

      {value.length >= max ? null : (
        <ImgInput.Input stretch={value.length <= 0}>
          <input
            id={`image-input-${inputId}`}
            type='file'
            accept='.png, .jpg, .jpeg'
            onChange={(e) => onChangeHandler(e)}
            multiple={multiple}
          />
          <label
            htmlFor={`image-input-${inputId}`}
            data-testid={`image-input-${inputId}`}
          >
            <x.div display='flex' flexDirection='column' alignItems='center'>
              <Icon icon={FiFileText} size='1.5rem' />
              <x.div mt={2} display='flex' alignItems='center'>
                <x.span color='content-subtle' textAlign='center'>
                  Drag your docs here, or{' '}
                  <x.span color='brand-primary'>browse</x.span>
                </x.span>
              </x.div>
              <x.span color='content-nonessential'>
                Supports: JPG, JPEG, PNG
              </x.span>
            </x.div>
          </label>
        </ImgInput.Input>
      )}
    </ImgInput.Wrapper>
  )
}

export default ImageInput
