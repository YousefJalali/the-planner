import { x } from '@xstyled/styled-components'
import * as _ from 'lodash'
import { FiX, FiFileText } from 'react-icons/fi'
import { ChangeEvent } from 'react'
import { ImageType } from '@the-planner/types'
import { parseImage } from '@the-planner/utils'
// import Image from 'next/image'

type Props = {
  value: ImageType[]
  onChange: (e: ChangeEvent<HTMLInputElement> | ImageType[]) => void
  max: number
  multiple?: boolean
  id?: string
}

export const ImageInput = ({
  value,
  onChange,
  max,
  multiple,
  id = _.uniqueId(),
}: Props) => {
  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const images = await parseImage(e.target.files)

    if (images) {
      onChange([...value, ...images])
    }
  }

  const onDeleteHandler = (index: number) => {
    onChange(value.filter((img: ImageType, i: number) => i !== index))
  }

  const inputId = id

  return (
    <x.div
      display="flex"
      position="relative"
      overflowX="scroll"
      minWidth="100%"
      h={156}
      spaceX={3}
    >
      {value.length > 0 &&
        value.map((img: ImageType, i: number) => (
          <x.div
            key={img.id}
            position="relative"
            borderRadius={2}
            overflow="hidden"
            h="100%"
            flex={`0 0 ${`${(img.width * 156) / img.height}px`}`}
          >
            <img
              src={img.path}
              alt={`preview-${i + 1}`}
              // layout="fill"
              // objectFit="cover"
            />

            <x.div
              onClick={() => onDeleteHandler(i)}
              data-testid={`delete-${i + 1}`}
              position="absolute"
              top={1}
              left={1}
              h={24}
              w={24}
              borderRadius="full"
              backgroundColor="layout-level3accent"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <FiX height={16} width={16} />
            </x.div>
          </x.div>
        ))}

      {value.length >= max ? null : (
        <x.div
          w={value.length <= 0 ? '100%' : 'fit-content'}
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px dashed"
          borderColor="layout-divider"
          borderRadius={2}
        >
          <x.input
            id={inputId}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => onChangeHandler(e)}
            multiple={multiple}
            w={0.1}
            h={0.1}
            opacity={0}
            overflow="hidden"
            position="absolute"
            zIndex={-1}
          />

          <x.label
            htmlFor={inputId}
            data-testid={inputId}
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={3}
          >
            <x.div display="flex" flexDirection="column" alignItems="center">
              <x.span fontSize="1.5rem">
                <FiFileText />
              </x.span>
              <x.div mt={2} display="flex" alignItems="center">
                <x.span
                  color="content-subtle"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Drag your docs here, or{' '}
                  <x.span color="brand-primary">browse</x.span>
                </x.span>
              </x.div>
              <x.span color="content-nonessential" whiteSpace="nowrap">
                Supports: JPG, JPEG, PNG
              </x.span>
            </x.div>
          </x.label>
        </x.div>
      )}
    </x.div>
  )
}

export default ImageInput
