import { render } from '@testing-library/react'

import Emoji from './emoji'

describe('Emoji', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Emoji />)
    expect(baseElement).toBeTruthy()
  })
})
