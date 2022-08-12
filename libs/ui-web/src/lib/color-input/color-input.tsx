import { x } from '@xstyled/styled-components'
import { useRef, FC } from 'react'
import { usePopper } from 'react-popper'
import { useOnClickOutside, useToggle } from '@the-planner/hooks'
import { ColorResult, ChromePicker } from 'react-color'

type Props = {
  id: string
  value: string
  onChange: (color: string) => void
}

export const ColorInput: FC<Props> = ({ id, value, onChange }) => {
  const [visible, setVisibility] = useToggle(false)

  const referenceRef = useRef(null)
  const popperRef = useRef(null)

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['bottom'],
          },
        },
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 4],
          },
        },
      ],
    }
  )

  const showColorPalette = () => setVisibility(true)

  const changeHandler = (color: ColorResult) => {
    onChange(color.hex)
  }

  useOnClickOutside(popperRef, () => setVisibility(false))

  return (
    <x.div>
      <x.button
        id={id}
        type="button"
        ref={referenceRef}
        onClick={showColorPalette}
        display="flex"
        alignItems="center"
        backgroundColor="transparent"
      >
        <x.div
          h={21}
          w={21}
          mx={2}
          borderRadius={100}
          border="2px solid"
          borderColor={value || 'layout-divider'}
          backgroundColor={value}
        />
      </x.button>
      <div
        ref={popperRef}
        style={{ zIndex: 1000, ...styles.popper }}
        {...attributes.popper}
      >
        <x.div display={visible ? 'block' : 'none'} style={styles.offset}>
          <ChromePicker color={value} onChange={changeHandler} />
        </x.div>
      </div>
    </x.div>
  )
}

export default ColorInput
