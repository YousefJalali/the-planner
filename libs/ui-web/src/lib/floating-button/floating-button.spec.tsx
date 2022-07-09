import { render } from '@testing-library/react'

import FloatingButton from './floating-button'

describe('FloatingButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FloatingButton />)
    expect(baseElement).toBeTruthy()
  })
})
