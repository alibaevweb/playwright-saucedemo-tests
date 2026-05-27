import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartIcon: Locator;
  readonly removeButton: Locator;
  readonly itemNameLocator: Locator;
  readonly inventoryitem: Locator;
  readonly checkout: Locator;
  readonly cartCancelLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-badge"]');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.itemNameLocator = page.locator('[data-test="inventory-item-name"]');
    this.inventoryitem = page.locator('[data-test="inventory-item"]');
    this.checkout = page.locator('[data-test="checkout"]');
    this.cartCancelLink = page.locator('[data-test="cancel"]');
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
}
