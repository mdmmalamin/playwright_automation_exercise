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

      test("Validating Login Attempts With Valid Credentials", async ({
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
          "mdmmalamin@gmail.com"
        );
        await runner.verifyElementIsVisible(loginPage.passwordInputField);
        await runner.clearInputField(loginPage.passwordInputField);
        await runner.typeInputBox(loginPage.passwordInputField, "Amintest@123");
        await runner.clickOnElement(loginPage.loginButton);

        await runner.verifyContainText(loginPage.loginHeadline,
          "Logged in as username");

      });
    });
  }
}
const testSuite = new LoginTest();
testSuite.runTests();
