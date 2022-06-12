import { Status } from '@the-planner/types'
import { format } from 'date-fns'

describe('Task List', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows options modal', () => {
    //click on kebab button & modal should appear
    cy.get('[data-testid=taskItem-kebab]').first().click()
    cy.get('#task-options-modal').should('be.visible')

    //click on backdrop & modal should be closed
    cy.get('#task-options-modal-backdrop').click()
    cy.get('#task-options-modal').should('not.be.visible')
  })

  it('shows status modal', () => {
    cy.get('[data-testid=taskItem-kebab]').first().click()
    cy.contains('a', 'Change').click()
    cy.get('#task-status-modal').should('be.visible')
  })

  it.only('shows task details modal', () => {
    cy.get('[data-testid=taskItem-details]').first().click()
    cy.get('#task-details-modal').should('be.visible')

    let taskItemTitle: string
    cy.get('[data-testid=taskItem-title]')
      .first()
      .should(($div) => {
        taskItemTitle = $div.text()
      })

    cy.get('[data-testid=taskDetails-title]').should(($div) => {
      const taskDetailsTitle = $div.text()
      expect(taskItemTitle).equal(taskDetailsTitle)
    })
  })
})

export {}
