describe('interacting spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      fixture: 'PkmnData'
    }).as('getParty');
    cy.visit('http://localhost:3001/');
    cy.visit('http://localhost:3000/Main/userval');
    cy.get('.Logo').should("be.visible");
    cy.get('.HUD').should('be.visible')
    cy.get('.HappinessBar').should('be.visible')
    cy.get('.EnergyBar').should('be.visible')
    cy.get('.ExperienceBar').should('be.visible')
    cy.get('.pokemon-sprite').should('be.visible')
  })

  it('should be able to click the sprite and happiness would go up', () => {
    cy.intercept('PATCH', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      body: {
        happiness: 94
      },
    }).as('playWithCurrentPokemon');
    cy.get('.pokemon-sprite').click()
    .wait('@playWithCurrentPokemon').its('response.statusCode').should('eq', 200);
  })

  it('should show alert when HL is overfilled', () => {
    cy.intercept('PATCH', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      body: {
        happiness: 94
      },
    }).as('playWithCurrentPokemon');
    cy.get('.pokemon-sprite').click().click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains("Your Pokemon is too exhausted to train, Your Pokemon is overstimulated, try playing with it later");;
    })
  })
})
