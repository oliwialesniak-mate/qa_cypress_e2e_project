// cypress/support/commands.js
import { faker } from '@faker-js/faker';

/**
 * Reset the database before each test
 */
Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', 'http://localhost:3000/api/test/reset');
});

/**
 * Generate a fake user
 */
Cypress.Commands.add('fakeUser', () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(12, true, /[A-Za-z0-9]/),
  };
  return cy.wrap(user);
});

/**
 * Generate a fake article
 */
Cypress.Commands.add('fakeArticle', () => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(5),
    body: faker.lorem.paragraphs(2, '\n\n'),
    tags: faker.lorem.words(3).split(' '),
  };
  return cy.wrap(article);
});

/**
 * Create a user via API and return user object
 */
Cypress.Commands.add('createUser', () => {
  cy.fakeUser().then((user) => {
    cy.request('POST', 'http://localhost:3000/api/users', { user });
    cy.wrap(user);
  });
});
