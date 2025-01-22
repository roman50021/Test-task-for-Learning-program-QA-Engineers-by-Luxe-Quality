import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

//Test Case 0004
describe('Logout tests for SauceDemo', () => {
    it('should logout the user successfully', async () => {
        // Логін
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        let currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Відкрити меню, перевірити пункти
        await inventoryPage.openMenu();
        const menuCount = await inventoryPage.getMenuItemsCount();
        expect(menuCount).toBe(4);

        // Logout
        await inventoryPage.logout();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://www.saucedemo.com/');

        // Перевірка полів
        const usernameValue = await loginPage.inputUsername.getValue();
        const passwordValue = await loginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');

        // Кнопка "Login" видна
        const isLoginButtonVisible = await loginPage.btnSubmit.isDisplayed();
        expect(isLoginButtonVisible).toBe(true);
    });
});
