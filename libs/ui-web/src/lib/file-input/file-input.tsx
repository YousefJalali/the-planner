import Image from 'next/image'
import { FiX, FiFileText } from 'react-icons/fi'
import { ChangeEvent } from 'react'
import { Attachment } from '@the-planner/types'
import { parseImage } from '@the-planner/utils'

type Props = {
  value: Attachment[]
  onChange: (e: ChangeEvent<HTMLInputElement> | Attachment[]) => void
  max: number
  id?: string
  multiple?: boolean
}

export const ImageInput = ({
  value = [],
  onChange,
  max,
  multiple,
  id,
}: Props) => {
  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const images = await parseImage(e.target.files)

    if (images) {
      onChange([...value, ...images])
    }
  }

  const deleteHandler = (index: number) => {
    onChange(value.filter((_, i: number) => i !== index))
  }

  const inputId = id || 'image-input'

  return (
    <div className="flex relative overflow-x-scroll min-w-full h-[156px] space-x-3 w-full">
      {value.length > 0 &&
        value.map((img: Attachment, i: number) => (
          <div
            key={img.id}
            className="relative rounded-lg overflow-hidden h-full"
            style={{ flex: `0 0 ${`${(img.width * 156) / img.height}px`}` }}
          >
            <Image
              src={img.path}
              alt={`preview-${i + 1}`}
              layout="fill"
              objectFit="cover"
            />

            <div
              onClick={() => deleteHandler(i)}
              data-testid={`delete-${i + 1}`}
              className="absolute top-1 left-1 h-6 w-6 rounded-full bg-base-300 flex justify-center items-center cursor-pointer"
            >
              <FiX size={16} />
            </div>
          </div>
        ))}

      {value.length >= max ? null : (
        <div
          className="h-full flex justify-center items-center rounded-lg w-full"
          style={{ width: value.length > 0 ? 'fit-content' : undefined }}
        >
          <label
            htmlFor={inputId}
            data-testid={inputId}
            className="w-full h-full flex justify-center items-center p-3 border border-dashed border-base-300 rounded-xl"
          >
            <div className="flex flex-col items-center">
              <FiFileText size={24} />

              <div className="mt-2">
                <span className="opacity-60 center whitespace-nowrap">
                  Drag your docs here, or
                </span>{' '}
                <span className="text-primary cursor-pointer">browse</span>
              </div>
              <span className="block mt-1 opacity-40 whitespace-nowrap text-sm">
                Supports: JPG, JPEG, PNG
              </span>
            </div>
          </label>

          <input
            id={inputId}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => changeHandler(e)}
            multiple={multiple}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}

export default ImageInput
