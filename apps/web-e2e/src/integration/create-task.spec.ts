import { Status } from '@the-planner/types'
import { format } from 'date-fns'

describe('Create task', () => {
  it.only('normal flow', () => {
    cy.visit('/')

    cy.get('#create-task-button').click()

    //title
    cy.get('#task-form-title')
      .type('test title')
      .should('have.value', 'test title')

    //project
    cy.get('#task-form-projectId').click()
    cy.get('[data-testid=projects-list-item]').eq(1).click()

    //open task
    cy.get('[data-testid=task-form-openTask]').click()

    //start date
    cy.get('#task-form-startDate').click()
    cy.get(`[aria-label="${'Choose ' + format(new Date(), 'PPPP')}"]`).click()

    //start time
    cy.get('#task-form-startTime').click()
    cy.get('.react-datepicker__time-list > li').first().click()

    //end date
    cy.get('#task-form-endDate').click()
    cy.get(`[aria-label="${'Choose ' + format(new Date(), 'PPPP')}"]`).click()

    //end time
    cy.get('#task-form-endTime').click()
    cy.get('.react-datepicker__time-list > li').last().click()

    //description
    cy.get('.ql-editor').type('small description')

    //attachments
    // cy.get('[data-cy="file-input"]').attachFile('83.jpeg')

    //submit
    cy.get('#create-task-form').submit()

    // cy.get(`[data-testid=taskItem-title]`).first().contains('test title')
    cy.get(`#${Status.PROPOSED}-tasks-list`)
      // .first()
      .contains('test title')
  })

  it('shows error on empty submit', () => {
    cy.visit('/')
    cy.get('#create-task-button').click()
    cy.get('#create-task-form').submit()
    cy.get(
      '[data-testid=task-form-title] > [data-testid=field-error]'
    ).contains(/Task must have a title/i)
  })
})

export {}
