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


})
it('button should be clickable', () => {

})
it('Should show correct text when clicking button', () => {

})

it('Should work when tabbing to button', () => {

})

it('Should show correct text when clicking button', () => {

})


});
