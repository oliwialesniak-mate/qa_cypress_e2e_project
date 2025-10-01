import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', (username = 'user32', password = 'Userpass1') => {
  cy.request('POST', 'http://localhost:1667/api/users/login', {
    user: { email: `${username}@hotmail.com`, password }
  }).then((resp) => {
    window.localStorage.setItem('jwtToken', resp.body.user.token);
  });
});

Cypress.Commands.add('fakeUser', () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'Userpass1',
  };
});
