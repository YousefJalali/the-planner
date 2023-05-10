import { render } from '@testing-library/react'

import ColorInput from './color-input'

describe('ColorInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColorInput />)
    expect(baseElement).toBeTruthy()
  })
})
