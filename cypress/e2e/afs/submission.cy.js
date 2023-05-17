describe('editor', () => {
  it('login and run submission', () => {
    // Discard a painful error to fix
    cy.on('uncaught:exception', err => !err.message.includes('ResizeObserver loop limit exceeded'))

    cy.visit('https://afs.romainclemencon.com/exercise/1')

    cy.contains('button', 'General Feedback').should('be.disabled')
    // open the login modal
    cy.get('button').contains('Sign in').click()

    // fill the form
    cy.get('input[type="email"]').type('romain.clemencon@mycit.ie')
    cy.get('input[type="password"]').type('1tTestafs/%')

    // submit the form 
    cy.get('button').contains('Login to your account').click().wait(1500)
  
    cy.contains('button', 'Sign Out').should('be.visible')
    
    cy.get('[id*="endregionheadlessui-dialog-panel"]').should('not.exist')

    cy.get('button').contains('Login to your account').should('not.exist')
    
    // run the exercise
    cy.get('button').contains('Run').click()

    cy.contains('button', 'Processing').should('be.visible')

    cy.contains('pre', 'test').should('be.visible')

    cy.contains('div', 'Feedback').should('be.visible')
  })

  it('run submission', () => {
    // Discard a painful error to fix
    cy.on('uncaught:exception', err => !err.message.includes('ResizeObserver loop limit exceeded'))

    cy.visit('https://afs.romainclemencon.com/exercise/1')

    cy.contains('button', 'General Feedback').should('be.disabled')
    // open the login modal
    cy.get('button').contains('Sign in').should('be.visible')

    cy.get('[id*="endregionheadlessui-dialog-panel"]').should('not.exist')

    cy.get('button').contains('Login to your account').should('not.exist')
    
    // run the exercise
    cy.get('button').contains('Run').click()

    cy.contains('button', 'Processing').should('be.visible')

    cy.contains('pre', 'test').should('be.visible')

    cy.contains('div', 'Feedback').should('be.visible')
  })

  it('change editor', () => {
    // Discard a painful error to fix
    cy.on('uncaught:exception', err => !err.message.includes('ResizeObserver loop limit exceeded'))

    cy.visit('https://afs.romainclemencon.com/exercise/1')

    cy.get('.monaco-editor').should('exist')
    
    cy.get('.monaco-editor')
    .click()
    .type('{ctrl}a{backspace}')
    .type('def draw_box():{enter}print("cypress - test")')

    // run the exercise
    cy.get('button').contains('Run').click()
    
    cy.contains('button', 'Processing').should('be.visible')

    cy.contains('pre', 'cypress - test').should('be.visible')

    cy.contains('div', 'Feedback').should('be.visible')
  })

})