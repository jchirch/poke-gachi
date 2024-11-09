describe('interacting spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      fixture: 'PkmnData'
    }).as('getParty');
    cy.visit('http://localhost:3001/');
})
});
