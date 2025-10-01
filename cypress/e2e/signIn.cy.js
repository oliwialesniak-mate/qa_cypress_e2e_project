import { SignInPage } from '../support/pages/SignInPage';

describe('Sign In', () => {
  const signIn = new SignInPage();

  it('logs in with valid credentials', () => {
    signIn.visit();
    signIn.fillEmail('user32@hotmail.com');
    signIn.fillPassword('Userpass1');
    signIn.submit();

    cy.get('[data-qa="user-profile"]').should('contain', 'user32');
  });

  it('fails with invalid credentials', () => {
    signIn.visit();
    signIn.fillEmail('wrong@example.com');
    signIn.fillPassword('wrongpass');
    signIn.submit();

    cy.get('[data-qa="error-message"]').should('contain', 'Invalid credentials');
  });
});
