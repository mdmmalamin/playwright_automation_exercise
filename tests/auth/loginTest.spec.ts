import { test, expect } from "@playwright/test";

test.describe("Login User with Correct Email and Password", () => {
  test("should login successfully and delete the account", async ({ page }) => {
    // 1. Launch browser and navigate
    await page.goto("https://automationexercise.com");

    // 2. Verify that home page is visible successfully
    await expect(page).toHaveURL("https://automationexercise.com/");
    await expect(page.locator('a[href="/login"]')).toBeVisible(); // Signup/Login button

    // 3. Click on 'Signup / Login' button
    await page.click('a[href="/login"]');

    // 4. Verify 'Login to your account' is visible
    await expect(
      page.locator('div[class='login-form'] h2("Login to your account")')
    ).toBeVisible();

    // 5. Enter correct email address and password
    await page.fill('input[data-qa="login-email"]', "mdmmalamin@gmail.com");
    await page.fill('input[data-qa="login-password"]', "Amintest@123");

    // 6. Click 'login' button
    await page.click('button[data-qa="login-button"]');

    await page.pause()

    // 7. Verify that 'Logged in as username' is visible
    await expect(page.locator("text=Logged in as username")).toBeVisible();

    // 8. Click 'Delete Account' button
    await page.click('a[href="/delete_account"]');

    // 9. Verify that 'ACCOUNT DELETED!' is visible
    await expect(page.locator('h2:has-text("Account Deleted!")')).toBeVisible();

    // Optional: Click 'Continue' if needed
    await page.click('a[data-qa="continue-button"]');
  });
});
