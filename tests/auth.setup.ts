import { test as setup } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';

const standartFile = 'playwright/.auth/user.json';
const problemFile = 'playwright/.auth/problem.json';

setup('standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.authorize('standard_user', 'secret_sauce');
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: standartFile });
});

setup('problem user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.authorize('problem_user', 'secret_sauce');
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  await page.context().storageState({ path: problemFile });
});
