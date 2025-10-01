/// <reference types="cypress" />

describe('Comments Tests', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('adds a comment to an article', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.fakeArticle().then((article) => {
        cy.request('POST', 'http://localhost:3000/api/articles', { article, userEmail: user.email });
        cy.visit('/article/' + encodeURIComponent(article.title));

        const commentText = faker.lorem.sentence();
        cy.get('textarea[name=comment]').type(commentText);
        cy.get('.post-comment').click();
        cy.contains(commentText);
      });
    });
  });

  it('deletes a comment', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.fakeArticle().then((article) => {
        cy.request('POST', 'http://localhost:3000/api/articles', { article, userEmail: user.email }).then(() => {
          cy.request('POST', `http://localhost:3000/api/articles/${article.title}/comments`, { comment: { body: faker.lorem.sentence() }, userEmail: user.email });
        });

        cy.visit('/article/' + encodeURIComponent(article.title));
        cy.get('.delete-comment').first().click();
        cy.contains('No comments yet').should('exist');
      });
    });
  });
});
