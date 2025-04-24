import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async isNewUserVisible() {
    return this.page.locator('text=New User Signup!').isVisible();
  }

  async fillSignupForm(name: string, email: string) {
    await this.page.fill('[data-qa="signup-name"]', name);
    await this.page.fill('[data-qa="signup-email"]', email);
    await this.page.click('[data-qa="signup-button"]');
  }

  async isAccountInfoVisible() {
    return this.page.locator('text=Enter Account Information').isVisible();
  }

  async fillAccountInfo(password: string) {
    await this.page.check('#id_gender1');
    await this.page.fill('#password', password);
    await this.page.selectOption('#days', '10');
    await this.page.selectOption('#months', '5');
    await this.page.selectOption('#years', '2000');
    await this.page.check('#newsletter');
    await this.page.check('#optin');
  }

  async fillAddressDetails() {
    await this.page.fill('#first_name', 'John');
    await this.page.fill('#last_name', 'Doe');
    await this.page.fill('#company', 'OpenAI');
    await this.page.fill('#address1', '123 AI Street');
    await this.page.fill('#address2', 'Suite 100');
    await this.page.selectOption('#country', 'Canada');
    await this.page.fill('#state', 'Ontario');
    await this.page.fill('#city', 'Toronto');
    await this.page.fill('#zipcode', 'M5J2N1');
    await this.page.fill('#mobile_number', '+1234567890');
  }

  async clickCreateAccount() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async isAccountCreatedVisible() {
    return this.page.locator('text=Account Created!').isVisible();
  }

  async clickContinue() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  async isLoggedInAsVisible(username: string) {
    return this.page.locator(`text=Logged in as ${username}`).isVisible();
  }

  async deleteAccount() {
    await this.page.click('a[href="/delete_account"]');
  }

  async isAccountDeletedVisible() {
    return this.page.locator('text=Account Deleted!').isVisible();
  }
}
