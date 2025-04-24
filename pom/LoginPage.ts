import { Page } from "@playwright/test";

export class LoginPage {
  readonly loginHeadline: string;
  readonly emailInputField: string;
  readonly passwordInputField: string;
  readonly loginButton: string;

  constructor(page: Page) {
    this.loginHeadline = `div[class='login-form']`;
    this.emailInputField = `[data-qa="login-email"]`;
    this.passwordInputField = `[data-qa="login-password"]`;
    this.loginButton = `[data-qa="login-button"]`;
  }
}
