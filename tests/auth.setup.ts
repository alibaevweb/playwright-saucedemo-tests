import { test as setup } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.authorize('standard_user', 'secret_sauce');
  // дождаться, что мы реально вошли — проверка по URL
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  // сохранить состояние браузера в файл
  await page.context().storageState({ path: authFile });
});
