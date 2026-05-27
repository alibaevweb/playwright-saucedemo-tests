import { Page, Locator } from '@playwright/test';

export class OverviewPage {
  readonly page: Page;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finish() {
    await this.finishButton.click();
  }
}
