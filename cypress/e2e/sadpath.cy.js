describe('help spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
    }).as('PkmnData');
    cy.visit('http://localhost:3000/');
    // cy.get('.click-here > img').click();
  })

it('Should handle nonexistant url', () => {
  cy.visit('http://localhost:3000/blugh')
  cy.get('p').contains("You shouldn't see this in the final version!")
})
it('button should bring back to start page', () => {
  cy.visit('http://localhost:3000/blugh')
  cy.get('.Logo').should("exist")
  cy.get('.Logo').click()
  cy.get('.click-here > img').should("exist");
})
it('should get an error page if data is returned incorrectly', () => {
  cy.visit('http://localhost:3000')
  cy.get('.click-here > img').click();
  cy.get('p').contains("You shouldn't see this in the final version!")
  cy.url().should('eq', "http://localhost:3000/error/SyntaxError:%20Unexpected%20end%20of%20JSON%20input")
})


});
