/// <reference types="cypress" />

describe('Articles Tests', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('creates an article', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.fakeArticle().then((article) => {
        cy.visit('/editor');
        cy.get('input[name=title]').type(article.title);
        cy.get('input[name=description]').type(article.description);
        cy.get('textarea[name=body]').type(article.body);
        article.tags.forEach(tag => cy.get('input[name=tags]').type(`${tag}{enter}`));
        cy.get('form').submit();
        cy.contains(article.title);
      });
    });
  });

  it('edits an article', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.fakeArticle().then((article) => {
        // create article via API
        cy.request('POST', 'http://localhost:3000/api/articles', { article, userEmail: user.email });
        cy.visit('/editor/' + encodeURIComponent(article.title));

        const updatedTitle = faker.lorem.sentence();
        cy.get('input[name=title]').clear().type(updatedTitle);
        cy.get('form').submit();
        cy.contains(updatedTitle);
      });
    });
  });

  it('deletes an article', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.fakeArticle().then((article) => {
        cy.request('POST', 'http://localhost:3000/api/articles', { article, userEmail: user.email });
        cy.visit('/article/' + encodeURIComponent(article.title));
        cy.get('.delete-article').click();
        cy.contains('No articles are here… yet.');
      });
    });
  });
});
