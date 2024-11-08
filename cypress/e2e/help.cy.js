describe('help spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
      fixture: 'single_pokemon'
    }).as('getParty');
    cy.visit('http://localhost:3000/');
    cy.get('.start-words').click();
  })

it('Should correctly show button', () => {
cy.wait('@getParty').as('PokemonDataRequest');
cy.get('.help-button').should('have.css', 'border-style',   'ridge');
cy.get('.help-button').should('have.css', 'background-size',   'cover');
cy.get('.help-button').should('have.css', 'background-color',   'rgb(255, 0, 0)');
})

it('button should be clickable', () => {
  cy.get('.help-button').should('have.css', 'cursor',   'pointer');

  cy.get('.help-button').click()
  cy.get('.modal-header').should('exist');
})
it('Should show correct text when clicking button', () => {
  cy.get('.help-button').click()
  cy.get('.modal-header').contains('Help')
  cy.get('.modal-body > :nth-child(1)').contains('Hello, Trainer, and welcome to the world of Poke-gachi! Here, your Pokémon thrive with your care and attention. You can feed, train, and play with your Pokémon. With a little love and care, they can even level up!')
})
it('Should allow user to close modal by clicking X button', () => {
  cy.get('.help-button').click()
  cy.get('.modal').should('exist')
  cy.get('.btn-close').click()
  cy.get('.modal').should('not.exist')
})

});
