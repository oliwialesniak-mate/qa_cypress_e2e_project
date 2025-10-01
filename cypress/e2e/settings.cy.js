import { ProfilePage } from '../support/pages/ProfilePage';
import { faker } from '@faker-js/faker';

describe('Profile Settings', () => {
  const profile = new ProfilePage();

  beforeEach(() => {
    cy.login();
    profile.visitSettings();
  });

  it('updates bio', () => {
    const bio = faker.lorem.sentence();
    profile.updateBio(bio);
    profile.save();
    cy.get('[data-qa="settings-bio"]').should('have.value', bio);
  });

  it('updates username', () => {
    const username = faker.internet.userName();
    profile.updateUsername(username);
    profile.save();
    cy.get('[data-qa="settings-username"]').should('have.value', username);
  });

  it('updates email', () => {
    const email = faker.internet.email();
    profile.updateEmail(email);
    profile.save();
    cy.get('[data-qa="settings-email"]').should('have.value', email);
  });

  it('updates password', () => {
    const password = 'NewPassword123';
    profile.updatePassword(password);
    profile.save();
    cy.get('[data-qa="success-message"]').should('be.visible');
  });
});
