import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Logout tests for SauceDemo', () => {
    // Test Case 0004
    it('should logout the user successfully', async () => {
        // Передумова: Логін
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        // Перевірка, що користувач знаходиться на сторінці інвентарю
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Відкриваємо меню та перевіряємо кількість елементів
        await InventoryPage.openMenu();
        const menuItems = await $$('.bm-item');
        expect(menuItems.length).toBe(4);

        // Логаут
        await InventoryPage.logout();

        // Перевірка URL
        const loginPageUrl = await browser.getUrl();
        expect(loginPageUrl).toBe('https://www.saucedemo.com/'); // Змінити залежно від реального URL

        // Перевірка кнопки "Login"
        const isLoginButtonVisible = await LoginPage.btnSubmit.isDisplayed();
        expect(isLoginButtonVisible).toBe(true);
    });

});
