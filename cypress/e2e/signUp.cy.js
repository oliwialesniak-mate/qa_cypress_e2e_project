import { SignUpPage } from '../support/pages/SignUpPage';
import { faker } from '@faker-js/faker';

describe('Sign Up', () => {
  const signUp = new SignUpPage();

  it('signs up with valid data', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = 'Userpass1';

    signUp.visit();
    signUp.fillUsername(username);
    signUp.fillEmail(email);
    signUp.fillPassword(password);
    signUp.submit();

    cy.get('[data-qa="user-profile"]').should('contain', username);
  });

  it('shows error with invalid data', () => {
    signUp.visit();
    signUp.fillUsername('');
    signUp.fillEmail('not-an-email');
    signUp.fillPassword('');
    signUp.submit();

    cy.get('[data-qa="error-message"]').should('be.visible');
  });
});
