import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsHeading: Locator;
  readonly addToCartButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartIcon: Locator;
  readonly removeButton: Locator;
  readonly itemNameLocator: Locator;
  readonly itemImgLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productsHeading = page.locator('[data-test="title"]');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.shoppingCartIcon = page.locator('[data-test="shopping-cart-badge"]');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.itemNameLocator = page.locator('[data-test="inventory-item-name"]');
    this.itemImgLink = page.locator('img.inventory_item_img');
  }

  async addToCart() {
    await this.addToCartButton.first().click();
  }
  async addToCartById(testId: string) {
    await this.page.getByTestId(testId).click();
  }

  async removeFirstFromCart() {
    await this.removeButton.first().click();
  }

  async removeFromCartById(testId: string) {
    await this.page.getByTestId(testId).click();
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }
}
