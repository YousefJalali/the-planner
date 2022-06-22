import { Status } from '@the-planner/types'
import { format } from 'date-fns'

describe('Create task', () => {
  it('normal flow', () => {
    cy.visit('/')

    cy.get('#create-task-fb').click()

    //title
    cy.get('#task-form-title')
      .type('test title')
      .should('have.value', 'test title')

    //project
    cy.get('#task-form-project').click()
    cy.get('#project-list-select>li').eq(1).click()

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

    cy.get(`#${Status.PROPOSED}-tasks-list > li`).first().contains('test title')
  })

  it('shows error on empty submit', () => {
    cy.visit('/')
    cy.get('#create-task-fb').click()
    cy.get('#create-task-form').submit()
  })
})

export {}