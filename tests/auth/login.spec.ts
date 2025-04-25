import { ExpectedTextProvider } from "../../utilities/valueProvider";
import automationExerciseData from "../../testData/automationExercise.json";
import { test } from "../../utilities/fixtures";

class LoginTest extends ExpectedTextProvider {
  constructor() {
    super();
  }

  runTests() {
    test.describe("Validating User Login Scenarios", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(
          automationExerciseData.automationExerciseTestUrl
        );
        await runner.verifyTitle(automationExerciseData.pageTitle);
      });

      test("Login User with correct email and password", async ({
        runner,
        homePage,
        loginPage,
      }) => {
        await runner.clickOnElement(homePage.signupLoginBtn);

        await runner.verifyContainText(
          loginPage.loginHeadline,
          "Login to your account"
        );
        await runner.verifyElementIsVisible(loginPage.emailInputField);
        await runner.clearInputField(loginPage.emailInputField);
        await runner.typeInputBox(
          loginPage.emailInputField,
          "usertest123@gmail.com"
        );
        await runner.verifyElementIsVisible(loginPage.passwordInputField);
        await runner.clearInputField(loginPage.passwordInputField);
        await runner.typeInputBox(loginPage.passwordInputField, "userTest@123");
        await runner.clickOnElement(loginPage.loginButton);

        await runner.verifyContainText(
          homePage.usernameBtn,
          `Logged in as User Test`
        );
        await runner.clickOnElement(homePage.deleteAccountBtn);
        await runner.verifyContainText(
          "div[class='col-sm-9 col-sm-offset-1'] h2[data-qa='account-deleted']",
          `Account Deleted!`
        );
      });

      test("Login User with incorrect email and password", async ({
        runner,
        homePage,
        loginPage,
      }) => {
        await runner.clickOnElement(homePage.signupLoginBtn);

        await runner.verifyContainText(
          loginPage.loginHeadline,
          "Login to your account"
        );
        await runner.verifyElementIsVisible(loginPage.emailInputField);
        await runner.clearInputField(loginPage.emailInputField);
        await runner.typeInputBox(
          loginPage.emailInputField,
          "usertest124@gmail.com"
        );
        await runner.verifyElementIsVisible(loginPage.passwordInputField);
        await runner.clearInputField(loginPage.passwordInputField);
        await runner.typeInputBox(loginPage.passwordInputField, "userTest@123");
        await runner.clickOnElement(loginPage.loginButton);

        await runner.verifyContainText(
          "p:has-text('Your email or password is incorrect!')",
          `Your email or password is incorrect!`
        );
      });
    });
  }
}
const testSuite = new LoginTest();
testSuite.runTests();
