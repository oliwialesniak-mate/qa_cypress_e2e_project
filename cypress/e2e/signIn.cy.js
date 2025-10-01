/// <reference types="cypress" />

describe('Sign In Tests', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('signs up a new user', () => {
    cy.fakeUser().then((user) => {
      cy.visit('/signup');
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();
      cy.contains(`Welcome, ${user.username}`);
    });
  });

  it('signs in an existing user', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();
      cy.contains(`Welcome, ${user.username}`);
    });
  });
});
