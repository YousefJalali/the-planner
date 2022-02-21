import { render, screen } from '../../test-utils'
import Home from '../../pages/index'
import { rest, setupWorker } from 'msw'
import { waitFor, waitForElementToBeRemoved } from '@testing-library/dom'

describe('Home', () => {
  it('render projects', async () => {
    window.HTMLElement.prototype.scrollTo = function () {}

    render(<Home />)
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          name: /tasks/i,
        })
      ).toBeInTheDocument()
    )
  })
})
