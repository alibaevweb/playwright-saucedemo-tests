# SauceDemo E2E Tests

[![Playwright Tests](https://github.com/alibaevweb/playwright-saucedemo-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/alibaevweb/playwright-saucedemo-tests/actions/workflows/playwright.yml)

Автоматизированные E2E-тесты для интернет-магазина [SauceDemo](https://www.saucedemo.com/).
Учебный проект для практики автоматизации тестирования.

## Технологии

- Playwright
- TypeScript

## Что покрыто тестами

- Успешная авторизация с правильными учетными данными
- Негативный сценарий: авторизация с неправильными учетными данными
- Негативный сценарий: авторизация с пустыми полями (логин и/или пароль)
- Негативный сценарий: авторизация с заблокированным пользователем
- Проверка наличия элементов на странице продуктов (заголовок, кнопка "Add to cart", иконка корзины, список товаров)
- Добавление одного товара в корзину и проверка счётчика
- Добавление всех товаров в корзину
- Удаление товара из корзины
- Удаление товара из корзины по id
- Оформление заказа (checkout) до экрана подтверждения

## Структура проекта

- `page/` — Page Object классы:
  - `LoginPage` — страница авторизации
  - `ProductsPage` — страница с товарами
  - `CartPage` — корзина
  - `CheckoutPage` — форма оформления заказа
  - `OverviewPage` — страница подтверждения заказа
  - `CompletePage` — страница успешного оформления заказа
- `tests/` — файлы с тестами:
  - `auth.setup.ts` — setup авторизации
  - `login.spec.ts` — тесты авторизации c без сессии
  - `product.spec.ts` — тесты страницы продуктов
  - `cart.spec.ts` — тесты корзины и оформления заказа
- `helper/const/` — константы (список товаров, id кнопок добавления и удаления)
- `helper/fixtures.ts` — фикстуры
- `playwright.config.ts` — конфигурация Playwright и storage state для авторизации

## Запуск

```
npm install
npx playwright test
```

Запуск одного файла:

```
npx playwright test tests/login.spec.ts
```

## CI

Тесты запускаются автоматически через GitHub Actions при каждом push и pull request в ветки `main` и `master`.
