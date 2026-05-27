import { Page, Locator } from '@playwright/test';

export class CompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly backToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backToProducts = page.locator('[data-test="back-to-products"]');
  }
}
