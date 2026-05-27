import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly button: Locator;
  readonly errorMessage: Locator;
  readonly productsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.button = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsHeading = page.locator('[data-test="title"]');
  }
  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async authorize(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.button.click();
  }
}
