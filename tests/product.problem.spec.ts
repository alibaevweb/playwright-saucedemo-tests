import { test, expect } from '../helper/fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test.skip('У problem_user картинки товаров разные', async ({ productsPage }) => {
  const images = productsPage.page.locator('img.inventory_item_img');

  const firstSrc = await images.nth(0).getAttribute('src');
  const secondSrc = await images.nth(1).getAttribute('src');

  expect(firstSrc).not.toBe(secondSrc);
});
