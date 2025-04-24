import { Page } from "@playwright/test";

export class HomePage {
  readonly signupLoginBtn: string;

  constructor(page: Page) {
    this.signupLoginBtn = `css=ul.navbar-nav a[href="/login"]`;
  }
}
