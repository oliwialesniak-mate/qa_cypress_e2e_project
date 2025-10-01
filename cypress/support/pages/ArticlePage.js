import { PageObject } from './PageObject';

export class ArticlePage extends PageObject {
  visitEditor() {
    super.visit('/editor');
  }

  fillTitle(title) {
    this.getByQa('article-title').clear().type(title);
  }

  fillDescription(description) {
    this.getByQa('article-description').clear().type(description);
  }

  submit() {
    this.getByQa('article-submit').click();
  }

  edit() {
    this.getByQa('article-edit').click();
  }

  delete() {
    this.getByQa('article-delete').click();
  }
}
