import { FollowPage } from '../support/pages/FollowPage';

describe('Follow/Unfollow', () => {
  const follow = new FollowPage();

  beforeEach(() => {
    cy.login();
  });

  it('follows a user', () => {
    follow.visitProfile('user33');
    follow.follow();
    cy.get('[data-qa="unfollow-button"]').should('be.visible');
  });

  it('unfollows a user', () => {
    follow.visitProfile('user33');
    follow.unfollow();
    cy.get('[data-qa="follow-button"]').should('be.visible');
  });
});
