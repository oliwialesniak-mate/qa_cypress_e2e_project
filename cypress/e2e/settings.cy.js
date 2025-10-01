/// <reference types="cypress" />

describe('Settings Tests', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('updates user settings', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.visit('/settings');
      const newEmail = faker.internet.email();
      cy.get('input[name=email]').clear().type(newEmail);
      cy.get('form').submit();
      cy.contains('Settings updated');

      cy.request('GET', 'http://localhost:3000/api/user')
        .its('body.user.email')
        .should('eq', newEmail);
    });
  });
});
