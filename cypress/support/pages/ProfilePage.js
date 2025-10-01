import { PageObject } from './PageObject';

export class ProfilePage extends PageObject {
  visitSettings() {
    super.visit('/settings');
  }

  updateBio(bio) {
    this.getByQa('settings-bio').clear().type(bio);
  }

  updateUsername(username) {
    this.getByQa('settings-username').clear().type(username);
  }

  updateEmail(email) {
    this.getByQa('settings-email').clear().type(email);
  }

  updatePassword(password) {
    this.getByQa('settings-password').clear().type(password);
  }

  save() {
    this.getByQa('settings-submit').click();
  }
}
