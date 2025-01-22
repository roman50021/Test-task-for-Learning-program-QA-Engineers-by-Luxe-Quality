import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

// Test Case 0004
describe('Logout tests for SauceDemo', () => {

    it('should logout the user successfully', async () => {
        // Передумова: Логін
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        // Перевірка, що користувач знаходиться на сторінці інвентарю
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Відкриваємо меню та перевіряємо кількість елементів
        await inventoryPage.openMenu();
        const menuItems = await $$('.bm-item');
        expect(menuItems.length).toBe(4);

        // Логаут
        await inventoryPage.logout();

        // Перевірка URL
        const loginPageUrl = await browser.getUrl();
        expect(loginPageUrl).toBe('https://www.saucedemo.com/'); // Змінити залежно від реального URL

        // Перевірка, що поля "username" та "password" порожні
        const usernameValue = await loginPage.inputUsername.getValue();
        const passwordValue = await loginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');

        // Перевірка кнопки "Login"
        const isLoginButtonVisible = await loginPage.btnSubmit.isDisplayed();
        expect(isLoginButtonVisible).toBe(true);
    });

});
