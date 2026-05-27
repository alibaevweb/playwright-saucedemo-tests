import { test, expect } from '../helper/fixtures';
import { ADD_BUTTON } from '../helper/const/product';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test.describe('Проверка удаления товара из корзины', () => {
  test('Удаление одного товара из корзины', async ({ productsPage, cartPage }) => {
    await productsPage.addToCart();
    await productsPage.openCart();
    await cartPage.removeFromCart();
    await expect(cartPage.shoppingCartIcon).toHaveCount(0);
  });

  test('Удаление товаров из корзины по id', async ({ productsPage, cartPage }) => {
    for (const productId of ADD_BUTTON) {
      await productsPage.addToCartById(productId);
    }
    await productsPage.openCart();
    await cartPage.removeFromCartById('remove-sauce-labs-bike-light');
    await expect(cartPage.inventoryItem).toHaveCount(5);
    await expect(cartPage.shoppingCartIcon).toHaveText('5');
  });
});

test('Добавление 2 товара в корзину', async ({ productsPage, cartPage }) => {
  await productsPage.addToCartById('add-to-cart-sauce-labs-backpack');
  await productsPage.addToCartById('add-to-cart-sauce-labs-bolt-t-shirt');
  await productsPage.openCart();
  await expect(cartPage.inventoryItem).toHaveCount(2);
  await expect(cartPage.shoppingCartIcon).toHaveText('2');
});

test('Оформление заказа', async ({
  productsPage,
  cartPage,
  checkoutPage,
  overviewPage,
  completePage,
}) => {
  await productsPage.addToCartById('add-to-cart-sauce-labs-backpack');
  await productsPage.addToCartById('add-to-cart-sauce-labs-bolt-t-shirt');
  await productsPage.openCart();
  await cartPage.checkoutClick();
  await checkoutPage.information('Test', 'Testov', '00000');
  await checkoutPage.continue();
  await overviewPage.finish();

  await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
});
