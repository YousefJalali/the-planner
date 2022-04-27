import { x } from '@xstyled/styled-components'
import { useRef, FC } from 'react'
import { usePopper } from 'react-popper'
import useOnClickOutside from '../../common/hooks/useOnClickOutside'
import useToggle from '../../common/hooks/useToggle'
import { ColorResult, ChromePicker } from 'react-color'

type Props = {
  value: string
  onChange: (color: string) => void
}

const ColorInput: FC<Props> = ({ value, onChange }) => {
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
    <>
      <x.button
        display='flex'
        alignItems='center'
        onClick={showColorPalette}
        ref={referenceRef}
        type='button'
      >
        <x.div
          h={21}
          w={21}
          mx={2}
          borderRadius={100}
          border='2px solid'
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
    </>
  )
}

export default ColorInput
