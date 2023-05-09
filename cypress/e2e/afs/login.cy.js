describe('login', () => {
  it('user login', () => {

    cy.visit('https://afs.romainclemencon.com/')

    // open the login modal
    cy.get('button').contains('Sign in').click()

    // fill the form
    cy.get('input[type="email"]').type('romain.clemencon@mycit.ie')
    cy.get('input[type="password"]').type('1tTestafs/%')

    // submit the form 
    cy.get('button').contains('Login to your account').click()
  
    cy.contains('button', 'Sign Out').should('be.visible')
  })
})