import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { LoginPage } from "../pom/LoginPage";
import { HomePage } from "../pom/HomePage";

const test = base.extend<{
  runner: Utils;
  homePage: HomePage;
  loginPage: LoginPage;
  // accountPage: AccountPage;
}>({
  runner: async ({ page }: { page: Page }, use) => {
    const utilsInstance = new Utils(page);
    await use(utilsInstance);
  },
  homePage: async ({ page }: { page: Page }, use) => {
    const homePageInstance = new HomePage(page);
    await use(homePageInstance);
  },
  loginPage: async ({ page }: { page: Page }, use) => {
    const loginPageInstance = new LoginPage(page);
    await use(loginPageInstance);
  },
});

export { test };
