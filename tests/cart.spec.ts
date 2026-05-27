import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { ProductsPage } from '../page/ProductsPage';
import { PRODUCT, ADD_BUTTON } from '../helper/const/product';
import { CartPage } from '../page/CartPage';
import { CompletePage } from '../page/CompletePage';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let completePage: CompletePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
  completePage = new CompletePage(page);
  await loginPage.open();
  await loginPage.authorize('standard_user', 'secret_sauce');
});

test.describe('Проверка удаления товара из корзины', () => {
  test('Удаление одного товара из корзины', async () => {
    await productsPage.addToCart();
    await cartPage.openCart();
    await cartPage.removeFromCart();
    await expect(cartPage.shoppingCartIcon).toHaveCount(0);
  });

  test('Удаление товаров из корзины по id', async () => {
    for (const productId of ADD_BUTTON) {
      await productsPage.addToCartById(productId);
    }
    await cartPage.openCart();
    await cartPage.removeFromCartById('remove-sauce-labs-bike-light');
    await expect(cartPage.inventoryitem).toHaveCount(5);
    await expect(cartPage.shoppingCartIcon).toHaveText('5');
  });
});

test('Добавление всех товаров в корзину', async () => {
  for (const productId of ADD_BUTTON) {
    await productsPage.addToCartById(productId);
  }
  await cartPage.openCart();
  await expect(cartPage.inventoryitem).toHaveCount(6);
  await expect(cartPage.shoppingCartIcon).toHaveText('6');
});

test('Добавление 2 товара в корзину', async () => {
  await productsPage.addToCartById('add-to-cart-sauce-labs-backpack');
  await productsPage.addToCartById('add-to-cart-sauce-labs-bolt-t-shirt');
  await cartPage.openCart();
  await expect(cartPage.inventoryitem).toHaveCount(2);
  await expect(cartPage.shoppingCartIcon).toHaveText('2');
});

test('Оформление заказа', async () => {
  await productsPage.addToCartById('add-to-cart-sauce-labs-backpack');
  await productsPage.addToCartById('add-to-cart-sauce-labs-bolt-t-shirt');
  await cartPage.openCart();
  await cartPage.checkoutClick();
  await cartPage.information('Test', 'Testov', '00000');
  await cartPage.continue();
  await cartPage.finish();

  await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
});
