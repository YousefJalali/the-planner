import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { Text } from '../../styles'
import ImgInput from '../../styles/components/ImageInputStyle'
import { X, Plus } from 'lucide-react'
import { ChangeEvent } from 'react'
import Label from '../../styles/components/LabelStyle'
import { FieldError } from 'react-hook-form'
import getBlobUrl from '../../common/utils/getBlobUrl'

export type ImgType = {
  id: string
  name: string
  path: string
}

type Props<T> = {
  value: ImgType[]
  error?: FieldError | undefined
  // setError: UseFormSetError<T>
  // onChange: (img: ImgType) => void
  onChange: (e: ChangeEvent<HTMLInputElement> | ImgType[]) => void
  max: number
  disabled?: boolean
  supportive?: string
  multiple?: boolean
}

function ImageInput<T extends Record<string, any> = Record<string, any>>(
  props: Props<T>
) {
  const {
    value,
    onChange,
    max,
    disabled,
    supportive,
    error,
    multiple,
    // setError,
  } = props

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const images = await getBlobUrl(e.target.files)
    if (images) {
      onChange([...value, ...images])
    }
  }

  const onDeleteHandler = (index: number) => {
    onChange(value.filter((img: ImgType, i: number) => i !== index))
  }

  const inputId = uuidv4()

  return (
    <ImgInput.Fieldset error={_.isObject(error)}>
      <Label>Attachments</Label>
      <ImgInput.Wrapper>
        {value.length > 0 &&
          value.map((img: ImgType, i: number) => (
            <ImgInput.ImageWrapper key={img.id}>
              <img src={img.path} alt={`preview-${i + 1}`} />
              <ImgInput.DeleteButton
                onClick={() => onDeleteHandler(i)}
                data-testid={`delete-${i + 1}`}
              >
                <X height={16} width={16} />
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

              // {...props}
            />
            <label
              htmlFor={`image-input-${inputId}`}
              data-testid={`image-input-${inputId}`}
            >
              <Plus height={20} width={20} />
              <span>Add photos</span>
            </label>
          </ImgInput.Input>
        )}
        {disabled && <ImgInput.Overlay />}
      </ImgInput.Wrapper>
      <ImgInput.SupportiveText as='span'>
        <Text>Photos • {value.length}/10 </Text>
        {!error && supportive}
      </ImgInput.SupportiveText>{' '}
      {error && <ImgInput.ErrorMessage>{error.message}</ImgInput.ErrorMessage>}
    </ImgInput.Fieldset>
  )
}

export default ImageInput

// import _ from 'lodash'
// import { v4 as uuidv4 } from 'uuid'
// import { Text } from '../../styles'
// import ImgInput from '../../styles/components/ImageInputStyle'
// import { X, Plus } from 'react-feather'
// import { useController, UseControllerProps } from 'react-hook-form'
// import { ChangeEvent, InputHTMLAttributes } from 'react'
// import Label from '../../styles/components/LabelStyle'

// type ImgType = {
//   id: string
//   path: string
// }

// type Props<T> = {
//   max: number
//   disabled?: boolean
//   supportive?: string
// } & UseControllerProps<T> &
//   InputHTMLAttributes<HTMLInputElement>

// function ImageInput<T extends Record<string, any> = Record<string, any>>(
//   props: Props<T>
// ) {
//   const { max, disabled, supportive } = props

//   const {
//     field: { onChange, value },
//     fieldState: { error },
//   } = useController(props)

//   const readAsDataURL = (file: File) => {
//     let fileReader = new FileReader()
//     return new Promise<ImgType>((resolve, reject) => {
//       //in case of error
//       fileReader.onerror = () => {
//         fileReader.abort()
//         reject(new DOMException('Problem parsing input file.'))
//       }

//       fileReader.onload = function () {
//         return resolve({
//           id: uuidv4(),
//           path: fileReader.result as string,
//         })
//       }

//       fileReader.readAsDataURL(file)
//     })
//   }

//   const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return

//     //convert fileList obj to an array of File
//     const files: File[] = _.values(e.target.files)

//     try {
//       const images: ImgType[] = await Promise.all(
//         files.map((file) => readAsDataURL(file))
//       )
//       onChange([...value, ...images])
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const onDeleteHandler = (index: number) => {
//     onChange(value.filter((img: ImgType, i: number) => i !== index))
//   }

//   const inputId = uuidv4()

//   return (
//     <ImgInput.Fieldset error={_.isObject(error)}>
//       <Label>Attachments</Label>
//       <ImgInput.Wrapper>
//         {value.length > 0 &&
//           value.map((img: ImgType, i: number) => (
//             <ImgInput.ImageWrapper key={img.id}>
//               <img src={img.path} alt='alt' />
//               <ImgInput.DeleteButton onClick={() => onDeleteHandler(i)}>
//                 <X height={16} width={16} />
//               </ImgInput.DeleteButton>
//             </ImgInput.ImageWrapper>
//           ))}

//         {value.length >= max ? null : (
//           <ImgInput.Input stretch={value.length <= 0}>
//             <input
//               id={`image-input-${inputId}`}
//               type='file'
//               accept='.png, .jpg, .jpeg'
//               onChange={(e) => onChangeHandler(e)}
//               {...props}
//             />
//             <label htmlFor={`image-input-${inputId}`}>
//               <Plus height={20} width={20} />
//               <span>Add photos</span>
//             </label>
//           </ImgInput.Input>
//         )}
//         {disabled && <ImgInput.Overlay />}
//       </ImgInput.Wrapper>
//       <ImgInput.SupportiveText as='span'>
//         <Text>Photos • {value.length}/10 </Text>
//         {!error && supportive}
//       </ImgInput.SupportiveText>{' '}
//       {error && <ImgInput.ErrorMessage>{error.message}</ImgInput.ErrorMessage>}
//     </ImgInput.Fieldset>
//   )
// }

// export default ImageInput
