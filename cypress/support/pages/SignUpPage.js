import { PageObject } from './PageObject';

export class SignUpPage extends PageObject {
  visit() {
    super.visit('/register');
  }

  fillUsername(username) {
    this.getByQa('sign-up-username').type(username);
  }

  fillEmail(email) {
    this.getByQa('sign-up-email').type(email);
  }

  fillPassword(password) {
    this.getByQa('sign-up-password').type(password);
  }

  submit() {
    this.getByQa('sign-up-submit').click();
  }
}
