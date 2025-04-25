import { Page } from "@playwright/test";

export class HomePage {
  readonly signupLoginBtn: string;
  readonly usernameBtn: string;
  readonly deleteAccountBtn: string;

  constructor(page: Page) {
    this.signupLoginBtn = `css=ul.navbar-nav a[href="/login"]`;
    this.usernameBtn = `css=ul.navbar-nav li:last-child`;
    this.deleteAccountBtn = `css=ul.navbar-nav a[href="/delete_account"]`;
  }
}
