describe('Start spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
      fixture: 'single_pokemon'
    }).as('getParty');
    cy.visit('http://localhost:3001/');
  })

  it('Should correctly show title screen on start page', () => {
    cy.get('.Logo').should("exist")
  })

  it('Should correctly show logo and entry buttons on the start page.', () => {
    cy.get('.Logo').should("exist")
    cy.get('.start-area').should("exist")
    cy.get('.click-here').should("exist")
    cy.get('.click-here > img').should("exist")
  })

  it('Should navigate to play screen when link is clicked', () => {
    cy.get('.click-here > img').should("exist");
    cy.get('.click-here > img').click();
    cy.get('.play-container').should("be.visible");
    cy.get('.Logo').should("be.visible");
  })
});