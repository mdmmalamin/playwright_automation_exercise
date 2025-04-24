import { expect, Page } from "@playwright/test";

export class Utils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
    } catch (error) {
      const errorMsg = `Failed to navigate to ${url}`;
      throw new Error(errorMsg);
    }
  }

  async clickOnElement(identifier: string): Promise<void> {
    try {
      await this.page.isVisible(identifier);
      await this.page.locator(identifier).click();
    } catch (error) {
      const errorMsg = `Failed to click on element with identifier: ${identifier}`;
      throw new Error(errorMsg);
    }
  }

  async mouseHover(identifier: string): Promise<void> {
    try {
      await this.page.locator(identifier).hover();
    } catch (error) {
      const errorMsg = `Failed to hover over element with identifier: ${identifier}`;
      throw new Error(errorMsg);
    }
  }

  async fillInputBox(identifier: string, text: string): Promise<void> {
    try {
      await this.page.locator(identifier).fill(text);
    } catch (error) {
      const errorMsg = `Failed to fill input box (${identifier}) with text: "${text}"`;
      throw new Error(errorMsg);
    }
  }

  async typeInputBox(identifier: string, text: string): Promise<void> {
    try {
      const inputField = this.page.locator(identifier);
      await inputField.fill(""); // Clear first
      await inputField.fill(text);
    } catch (error) {
      const errorMsg = `Failed to type text: "${text}" in input box (${identifier})`;
      throw new Error(errorMsg);
    }
  }

  async verifyTitle(title: string): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(title);
    } catch (error) {
      const errorMsg = `Failed to verify title: "${title}"`;
      throw new Error(errorMsg);
    }
  }

  async verifyContainsUrl(url: string, timeout: number = 20000): Promise<void> {
    try {
      await this.page.waitForLoadState("load", { timeout: timeout });
      await expect(this.page).toHaveURL(url);
    } catch (error) {
      const errorMsg = `Failed to verify URL contains: "${url}" within ${timeout}ms`;
      throw new Error(errorMsg);
    }
  }

  async verifyContainText(
    identifier: string,
    expectedText: string
  ): Promise<void> {
    try {
      await expect
        .soft(this.page.locator(identifier))
        .toContainText(expectedText);
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} contains text: "${expectedText}"`;
      throw new Error(errorMsg);
    }
  }

  async verifyToHaveValue(
    identifier: string,
    inputFieldText: string
  ): Promise<void> {
    try {
      await expect
        .soft(this.page.locator(identifier))
        .toHaveValue(inputFieldText);
    } catch (error) {
      const errorMsg = `Failed to verify element (${identifier}) has value: "${inputFieldText}"`;
      throw new Error(errorMsg);
    }
  }

  async verifyToHaveCss(
    identifier: string,
    key: string,
    value: string
  ): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).toHaveCSS(key, value);
    } catch (error) {
      const errorMsg = `Failed to verify ${identifier} has CSS property "${key}": "${value}"`;
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsVisible(identifier: string): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).toBeVisible();
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is visible`;
      throw new Error(errorMsg);
    }
  }

  async verifyLinksText(
    identifier: string,
    expectedTexts: string | string[]
  ): Promise<void> {
    try {
      const elements = this.page.locator(identifier);
      const count = await elements.count();

      const textsArray = Array.isArray(expectedTexts)
        ? expectedTexts
        : new Array(count).fill(expectedTexts);

      if (textsArray.length !== count) {
        throw new Error(
          `Number of expected texts does not match the number of elements`
        );
      }

      for (let i = 0; i < count; i++) {
        const text = await elements.nth(i).innerText();
        expect.soft(text).toBe(textsArray[i]);
      }
    } catch (error) {
      const errorMsg = `Failed to verify link texts for ${identifier}`;
      throw new Error(errorMsg);
    }
  }

  async validateAndClick(
    identifier: string,
    expectedText: string
  ): Promise<void> {
    try {
      await this.page.locator(identifier).focus();
      await expect.soft(this.page.locator(identifier)).toBeVisible();
      const actualText = await this.page.locator(identifier).textContent();

      if (actualText && actualText.trim() === expectedText) {
        await this.page.locator(identifier).click();
      } else {
        const errorMsg = `Text mismatch on ${identifier}. Expected: "${expectedText}", Found: "${actualText}"`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      throw error;
    }
  }

  async validateButtonAttribute(
    identifier: string,
    hrefAttribute: string
  ): Promise<void> {
    try {
      const button = this.page.locator(identifier);
      await expect(button).toBeVisible();
      const hrefValue = await button.getAttribute("href");
      expect(hrefValue).toBe(hrefAttribute);
    } catch (error) {
      const errorMsg = `Failed to verify ${identifier} has href: "${hrefAttribute}"`;
      throw new Error(errorMsg);
    }
  }

  async scrollAndClick(identifier: string): Promise<void> {
    try {
      const targetElement = this.page.locator(identifier);
      await targetElement.scrollIntoViewIfNeeded();
      await expect(targetElement).toBeVisible();
      await targetElement.click();
    } catch (error) {
      const errorMsg = `Failed to scroll and click ${identifier}`;
      throw new Error(errorMsg);
    }
  }

  async wait(
    time: number,
    options: {
      waitForSelector?: string;
      waitForNetworkIdle?: boolean;
      waitForLoadState?: "load" | "domcontentloaded" | "networkidle";
    } = {}
  ): Promise<void> {
    const { waitForSelector, waitForNetworkIdle, waitForLoadState } = options;

    try {
      await this.page.waitForTimeout(time * 1000);

      if (waitForSelector) {
        await this.page.waitForSelector(waitForSelector, {
          state: "visible",
          timeout: time * 1000,
        });
      }

      if (waitForNetworkIdle) {
        await this.page.waitForLoadState("networkidle", {
          timeout: time * 1000,
        });
      }

      if (waitForLoadState) {
        await this.page.waitForLoadState(waitForLoadState, {
          timeout: time * 1000,
        });
      }
    } catch (error) {
      const errorMsg = "Failed to wait for the specified conditions";
      throw new Error(errorMsg);
    }
  }

  async clearInputField(identifier: string): Promise<void> {
    try {
      const inputField = this.page.locator(identifier);
      await expect(inputField).toBeVisible();
      await inputField.fill("");
    } catch (error) {
      const errorMsg = `Failed to clear input field ${identifier}`;
      throw new Error(errorMsg);
    }
  }
} // This is the class curly braces
