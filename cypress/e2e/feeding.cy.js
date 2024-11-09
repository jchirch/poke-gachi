describe('feeding spec', () => {
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

  it('should be able to click the feed button and energy would go up', () => {
    cy.intercept('PATCH', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      body: {
        energy: 30
      },
    }).as('updateEnergy');
    cy.get('.feed-button').click()
    .wait('@updateEnergy').its('response.statusCode').should('eq', 200);
  })
  
  it("Should show an alert when Feed button is clicked up energy is full", () => {
    cy.intercept('PATCH', 'https://obscure-caverns-08355-6f81aa04bbe3.herokuapp.com/api/v1/trainers/3/pokemons/5', {
      statusCode: 200,
      body: {
        energy: 110
      },
    }).as('updateEnergy');
    cy.get('.feed-button').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Your Pokemon is Stuffed!!! Try training to burn off some energy');
    })
  })
})
