describe('Start spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
      fixture: 'single_pokemon'
    }).as('getParty');
    cy.visit('http://localhost:3001/Main/userval');
  })

  it('Should correctly show title screen on start page', () => {
    cy.get('.Logo').should("exist")
  })

  it('Can navigate back to the start screen', () => {

  })

})