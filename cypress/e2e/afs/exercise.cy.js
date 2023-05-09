describe('exercise', () => {
  it('get exercise', () => {

    cy.visit('https://afs.romainclemencon.com/')

    // open the login modal
    cy.get('a[href*="/exercise/1"]').click()

    cy.contains('div', 'Draw a Box').should('be.visible')

  })
})