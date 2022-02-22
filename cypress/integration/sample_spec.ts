describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('/')

    // cy.contains(/see all/i).click()

    // cy.url().should('include', '/projects')

    cy.get('#create-task-fb').click()

    //title
    cy.get('#task-form-title')
      .type('test title')
      .should('have.value', 'test title')

    //project
    cy.get('#task-form-project').click()
    cy.get('#project-list-select>li').first().click()

    //start date
    cy.get('#task-form-startDate').click()
    cy.get(`[aria-label="Choose Tuesday, February 22nd, 2022"]`).click()

    //start time
    cy.get('#task-form-startTime').click()
    cy.get('.react-datepicker__time-list > li').first().click()

    //description
    cy.get('.ql-editor').type('hola')

    //attachments
    cy.get('#task-form-attachments').attachFile('83.jpeg')
  })
})

export {}
