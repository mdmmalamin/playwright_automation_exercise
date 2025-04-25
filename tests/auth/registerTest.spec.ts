import { test, expect } from "@playwright/test";

test("Register User Test", async ({ page }) => {
  await page.goto("https://automationexercise.com");

  await expect(page).toHaveURL("https://automationexercise.com/");

  await page.locator('a[href="/login"]').click();

  await expect(page.locator("text=New User Signup!")).toBeVisible();

  await page.locator('input[data-qa="signup-name"]').fill("PlaywrightUser");
  const email = `mdmmalamin@gmail.com`;
  await page.locator('input[data-qa="signup-email"]').fill(email);

  await page.locator('button[data-qa="signup-button"]').click();

  await expect(page.locator("text=Enter Account Information")).toBeVisible();

  await page.locator("#id_gender1").check();
  await page.locator("#password").fill("Amintest@123");
  await page.locator("#days").selectOption("10");
  await page.locator("#months").selectOption("5");
  await page.locator("#years").selectOption("1995");

  await page.locator("#newsletter").check();

  await page.locator("#optin").check();

  await page.locator("#first_name").fill("Test");
  await page.locator("#last_name").fill("User");
  await page.locator("#company").fill("Playwright Inc");
  await page.locator("#address1").fill("123 Test Street");
  await page.locator("#address2").fill("Apt 456");
  await page.locator("#country").selectOption("India");
  await page.locator("#state").fill("West Bengal");
  await page.locator("#city").fill("Kolkata");
  await page.locator("#zipcode").fill("700001");
  await page.locator("#mobile_number").fill("0123456789");

  await page.locator('button[data-qa="create-account"]').click();

  await expect(page.getByText("Account Created!")).toBeVisible();

  await page.locator('a[data-qa="continue-button"]').click();

  await expect(page.locator(`text=Logged in as PlaywrightUser`)).toBeVisible();

  await page.pause()

  await page.locator('a[href="/delete_account"]').click();

  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
});
