import { test, expect } from '../helper/fixtures';
import { PRODUCT, ADD_BUTTON } from '../helper/const/product';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test.describe('Проверка элементов на странице продуктов', () => {
  test('Проверка наличия заголовка "Products" на странице после успешной авторизации', async ({
    productsPage,
    loginPage,
  }) => {
    await expect(productsPage.productsHeading).toBeVisible();
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Проверка наличия кнопки "Add to cart" на странице после успешной авторизации', async ({
    productsPage,
  }) => {
    await expect(productsPage.addToCartButton.first()).toBeVisible();
  });

  test('Проверка наличия иконки корзины на странице после успешной авторизации', async ({
    productsPage,
  }) => {
    await expect(productsPage.shoppingCartLink).toBeVisible();
  });

  test('Проверка наличия всех товаров на странице', async ({ productsPage }) => {
    for (const product of PRODUCT) {
      const productLocator = productsPage.itemNameLocator.filter({ hasText: product });
      await expect(productLocator).toBeVisible();
      await expect(productLocator).toHaveText(product);
    }
  });
});

test.describe('Проверка добавления товара в корзину', () => {
  test('Добавление товара в корзину и проверка наличия иконки корзины и его количества = 1', async ({
    productsPage,
  }) => {
    await productsPage.addToCart();
    await expect(productsPage.shoppingCartIcon).toHaveText('1');
  });

  test('Добавления всех товаров кол-во = 6', async ({ productsPage }) => {
    for (const productId of ADD_BUTTON) {
      await productsPage.addToCartById(productId);
    }
    await expect(productsPage.shoppingCartIcon).toHaveText('6');
  });
});

test('Добавление товаров из списка и удаление одного из них, проверка количества товаров в корзине, должно быть 5', async ({
  productsPage,
  cartPage,
}) => {
  for (const testId of ADD_BUTTON) {
    await productsPage.addToCartById(testId);
  }
  await cartPage.removeFromCartById('remove-sauce-labs-bike-light');
  await expect(productsPage.shoppingCartIcon).toHaveText('5');
});

test('У user картинки товаров разные', async ({ productsPage }) => {
  const images = productsPage.page.locator('img.inventory_item_img');

  const firstSrc = await images.nth(0).getAttribute('src');
  const secondSrc = await images.nth(1).getAttribute('src');

  expect(firstSrc).not.toBe(secondSrc);
});
