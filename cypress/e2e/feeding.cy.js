describe('feeding spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
      fixture: 'PkmnData'
    }).as('getParty');
    cy.visit('http://localhost:3001/');
  })
  it('Should correctly show energy values', () => {

  })
  it('Should correctly update energy values when clicking the feed button.', () => {

  })
  it('Should correctly update energy values when clicking the train button.', () => {

  })

});
