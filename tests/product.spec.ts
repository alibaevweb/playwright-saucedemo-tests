import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { ProductsPage } from '../page/ProductsPage';
import { CartPage } from '../page/CartPage';
import { PRODUCT, ADD_BUTTON } from '../helper/const/product';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
  await loginPage.open();
  await loginPage.authorize('standard_user', 'secret_sauce');
});

test.describe('Проверка элементов на странице продуктов', () => {
  test('Проверка наличия заголовка "Products" на странице после успешной авторизации', async () => {
    await expect(productsPage.productsHeading).toBeVisible();
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Проверка наличия кнопки "Add to cart" на странице после успешной авторизации', async () => {
    await expect(productsPage.addToCartButton.first()).toBeVisible();
  });

  test('Проверка наличия иконки корзины на странице после успешной авторизации', async () => {
    await expect(cartPage.shoppingCartLink).toBeVisible();
  });

  test('Проверка наличия всех товаров на странице', async () => {
    for (const product of PRODUCT) {
      const productLocator = productsPage.itemNameLocator.filter({ hasText: product });
      await expect(productLocator).toBeVisible();
      await expect(productLocator).toHaveText(product);
    }
  });
});

test.describe('Проверка добавления товара в корзину', () => {
  test('Добавление товара в корзину и проверка наличия иконки корзины и его количества = 1', async () => {
    await productsPage.addToCart();
    await expect(productsPage.shoppingCartIcon).toHaveText('1');
  });

  test('Добавления всех товаров кол-во = 6', async () => {
    for (const productId of ADD_BUTTON) {
      await productsPage.addToCartById(productId);
    }
    await expect(productsPage.shoppingCartIcon).toHaveText('6');
  });
});

test('Добавление товаров из списка и удаление одного из них, проверка количества товаров в корзине, должно быть 5', async () => {
  for (const testId of ADD_BUTTON) {
    await productsPage.addToCartById(testId);
  }
  await cartPage.removeFromCartById('remove-sauce-labs-bike-light');
  await expect(productsPage.shoppingCartIcon).toHaveText('5');
});
