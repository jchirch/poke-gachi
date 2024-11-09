describe('Play spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      fixture: 'single_pokemon'
    }).as('getParty');
    cy.visit('http://localhost:3001');
    cy.get('.click-here > img').click();
  })

  it('Can render expected attributes on play area screen', () => {
    cy.get('.Logo').should("exist")
    cy.get('.playArea').should("exist")
    cy.get('.ui-info').should("exist")
    cy.get('.pokemon-display').should("exist")
    cy.get('.button-row').should("exist")
    cy.get('.HUD').should("exist")
    cy.get('.help-button').should("exist")
    cy.get('#currentRender').should("exist")
    cy.get('.pokemon-name-level').should("exist")
    cy.get('.pokemon-name-level').contains("Charmander")
    cy.get('.pokemon-name-level').contains("Level: 25")
    cy.get('.train-button > img').should("exist")
    cy.get('.feed-button > img').should("exist")
    cy.get('.party-button > img').should("exist")
  })

  it('Can navigate back to the start screen', () => {
    cy.get('.Logo').should("exist").click()
    cy.get('.start-area').should("exist")
    cy.get('.click-here').should("exist")
    cy.get('.click-here > img').should("exist")
  })
})