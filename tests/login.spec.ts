import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('Успешная авторизация с правильными учетными данными', async () => {
  await loginPage.authorize('standard_user', 'secret_sauce');
  await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(loginPage.productsHeading).toBeVisible();
});

test.describe('Неуспешная авторизация', () => {
  test('авторизация с неправильными учетными данными', async () => {
    await loginPage.authorize('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
  test('авторизация с пустыми полями', async () => {
    await loginPage.authorize('', '');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('авторизация с указанным логином и пустым паролем', async () => {
    await loginPage.authorize('standard_user', '');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

  test('авторизация с пустым логином и указанным паролем', async () => {
    await loginPage.authorize('', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });
  test('авторизация с заблокированным пользователем', async () => {
    await loginPage.authorize('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });
});
