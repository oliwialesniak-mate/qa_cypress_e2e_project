import { PageObject } from './PageObject';

export class SignInPage extends PageObject {
  visit() {
    super.visit('/login');
  }

  fillEmail(email) {
    this.getByQa('sign-in-email').type(email);
  }

  fillPassword(password) {
    this.getByQa('sign-in-password').type(password);
  }

  submit() {
    this.getByQa('sign-in-submit').click();
  }
}
