import { render } from '@testing-library/react'

import EmptyState from './empty-state'

describe('EmptyState', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmptyState />)
    expect(baseElement).toBeTruthy()
  })
})
