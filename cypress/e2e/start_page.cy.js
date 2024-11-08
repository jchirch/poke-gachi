describe('Start spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
      fixture: 'PkmnData'
    }).as('getParty');
    cy.visit('http://localhost:3000/');
  })

  it('Should correctly show title screen on start page',()=>{
    cy.get('.Logo').should('be.visible')
    .get('.start-header').should('be.visible')
    .get('.start-words').should('have.text', 'Current element is the start page.Click here to advance to the game!')
  })

  it('Should take the user to the play area when the entry button is clicked', () => {
    cy.get('.start-words').click()
    .get('.play-container').should('be.visible')
  })

});