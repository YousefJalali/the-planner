import { render, screen } from '../../test-utils'
import Home from '../../pages/index'
import { rest, setupWorker } from 'msw'
import { waitForElementToBeRemoved } from '@testing-library/dom'

describe('Home', () => {
  it('render projects', async () => {
    render(<Home />)
    const projectsHeading = screen.getByRole('heading', {
      name: /projects/i,
    })
    expect(projectsHeading).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
  })
})
