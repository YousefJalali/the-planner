import { render } from '@testing-library/react'

import ScrollableList from './scrollable-list'

describe('ScrollableList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScrollableList />)
    expect(baseElement).toBeTruthy()
  })
})
