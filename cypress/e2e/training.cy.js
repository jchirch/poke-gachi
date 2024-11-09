import energy from '../fixtures/single_pokemon.json'
describe('training spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      fixture: 'single_pokemon'
    }).as('getParty');

    cy.visit('http://localhost:3000/Main/userval');
    cy.get('.Logo').should("be.visible");
    cy.get('.HUD').should('be.visible')
    cy.get('.HappinessBar').should('be.visible')
    cy.get('.EnergyBar').should('be.visible')
    cy.get('.ExperienceBar').should('be.visible')
    cy.get('.help-button').should('be.visible')
  })

  it('should be able to click the train button and energy would go down and xp up', () => {
    cy.intercept('PATCH', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      body: {
        energy: 10,
        xp: 5
      }, 
    }).as('updateEnergy');
    cy.get('.train-button > img').click()
      .wait('@updateEnergy').its('response.statusCode').should('eq', 200);
  })

  it('should display a message when xp is drained', () => {
    cy.intercept('PATCH', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      body: {
        energy: 0,
        xp: 20
      }, 
    }).as('updateEnergy');
    cy.get('.train-button > img').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains("Your Pokemon is too exhausted to train, feed them to boost their energy");
    })
  })

})
