import { x } from '@xstyled/styled-components'
import { useState, useEffect, useRef } from 'react'
import { FiCircle } from 'react-icons/fi'
import { usePopper } from 'react-popper'
import useOnClickOutside from '../../common/hooks/useOnClickOutside'
import useToggle from '../../common/hooks/useToggle'
import Icon from '../Icon'
import Fieldset from './Fieldset'

function Dropdown() {
  const [visible, setVisibility] = useToggle(false)

  const referenceRef = useRef(null)
  const popperRef = useRef(null)

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [16, -5],
          },
        },
      ],
    }
  )

  function handleDropdownClick() {
    setVisibility(true)
  }

  useOnClickOutside(popperRef, () => setVisibility())

  return (
    <>
      <x.div display='flex'>
        <button type='button' ref={referenceRef} onClick={handleDropdownClick}>
          <Icon icon={FiCircle} size='1.5rem' />
        </button>

        <input placeholder='#459309' />
      </x.div>
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        <x.div
          display={visible ? 'flex' : 'none'}
          // w='2px'
          flexDirection='column'
          backgroundColor='layout-level0accent'
          borderRadius={2}
          p={2}
          style={styles.offset}
        >
          <x.div>Element</x.div>
        </x.div>
      </div>
    </>
  )
}

export default Dropdown
