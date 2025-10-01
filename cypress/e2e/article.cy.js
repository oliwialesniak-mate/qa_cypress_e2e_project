import { ArticlePage } from '../support/pages/ArticlePage';
import { faker } from '@faker-js/faker';

describe('Articles', () => {
  const article = new ArticlePage();

  beforeEach(() => {
    cy.login();
  });

  it('creates a new article', () => {
    const title = faker.lorem.words(3);
    const description = faker.lorem.sentence();

    article.visitEditor();
    article.fillTitle(title);
    article.fillDescription(description);
    article.submit();

    cy.get('[data-qa="article-title-display"]').should('contain', title);
  });

  it('edits an article', () => {
    const newTitle = faker.lorem.words(4);

    article.edit();
    article.fillTitle(newTitle);
    article.submit();

    cy.get('[data-qa="article-title-display"]').should('contain', newTitle);
  });

  it('deletes an article', () => {
    article.delete();
    cy.get('[data-qa="article-list"]').should('not.contain', 'Deleted');
  });
});
