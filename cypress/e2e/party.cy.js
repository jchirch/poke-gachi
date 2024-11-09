describe('party spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/2', {
      statusCode: 200,
      fixture: 'single_pokemon'
    }).as('getSinglePokemon');

    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons', {
      statusCode: 200,
      fixture: 'PkmnData'
    }).as('getParty');

    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/1/pokemons/3', {
      statusCode: 200,
      fixture: 'single_squirtle'
    }).as('getSingleSquirtle');

    cy.visit('http://localhost:3001/');
    cy.get('.click-here > img').click();
  })

  it('should have a party button my play screen', () => {
    cy.get('.party-button > img').should('exist')
  })
  it('should render a party modal when clicked', () => {
    cy.get('.party-button > img').click()
    cy.get('.modal-content').should('exist')
    cy.get('.modal-header').contains('Party')
    cy.get('.modal-body').should('exist')
    cy.get('ul > :nth-child(1)').contains('Squirtle, Level: 7')
    cy.get('ul > :nth-child(2)').contains('Charmander, Level: 27')
    cy.get('ul > :nth-child(3)').contains('Bulbasaur, Level: 8')
    cy.get('.modal-footer').contains('Close')
  })
  it('Should allow the user to exist the modal on click', ()=> {
    cy.get('.party-button > img').click()
    cy.get('.modal-content').should('exist')
    cy.get('.btn-close').click()
    cy.get('.modal-content').should('not.exist')
  })
  it('Should allow the user to swap pokemon on the screen when clicked', () => {
    cy.get('.party-button > img').click()
    cy.get('ul > :nth-child(1)').click()
    cy.get('.pokemon-name-level').contains('Squirtle, Level: 7')
  })
});
