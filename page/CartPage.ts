import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartIcon: Locator;
  readonly removeButton: Locator;
  readonly itemNameLocator: Locator;
  readonly inventoryitem: Locator;
  readonly checkout: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly submitButton: Locator;
  readonly cartCancelLink: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-badge"]');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.itemNameLocator = page.locator('[data-test="inventory-item-name"]');
    this.inventoryitem = page.locator('[data-test="inventory-item"]');
    this.checkout = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.submitButton = page.locator('[data-test="continue"]');
    this.cartCancelLink = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async removeFromCart() {
    await this.removeButton.first().click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async removeFromCartById(productId: string) {
    await this.page.getByTestId(productId).click();
  }

  async checkoutClick() {
    await this.checkout.click();
  }

  async information(firstName: string, lastName: string, postalCode: number) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.submitButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
