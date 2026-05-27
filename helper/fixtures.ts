import { test as base } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { ProductsPage } from '../page/ProductsPage';
import { CartPage } from '../page/CartPage';
import { CompletePage } from '../page/CompletePage';
import { CheckoutPage } from '../page/CheckoutPage';
import { OverviewPage } from '../page/OverviewPage';

type Pages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  overviewPage: OverviewPage;
  completePage: CompletePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  overviewPage: async ({ page }, use) => {
    await use(new OverviewPage(page));
  },
  completePage: async ({ page }, use) => {
    await use(new CompletePage(page));
  },
});

export { expect } from '@playwright/test';
