import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

//Test Case 0005
describe('Cart tests for SauceDemo', () => {
    it('should keep items in cart after logout and login', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        let currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Додаємо backpack до кошика
        await inventoryPage.addBackpackToCart();

        // Перевіряємо badge
        expect(await inventoryPage.getCartBadgeText()).toBe('1');

        // Відкрити бургер-меню, перевірити кількість пунктів
        await inventoryPage.openMenu();
        expect(await inventoryPage.getMenuItemsCount()).toBe(4);

        // Logout
        await inventoryPage.logout();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://www.saucedemo.com/');

        // Перевірка полів логіна
        const usernameValue = await loginPage.inputUsername.getValue();
        const passwordValue = await loginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');

        // Логін знову
        await loginPage.login('standard_user', 'secret_sauce');
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Знову перевірити, що badge = 1
        expect(await inventoryPage.getCartBadgeText()).toBe('1');

        // Відкрити кошик
        await cartPage.openCart();

        // Перевірити назву товару в кошику
        const firstItemName = await cartPage.getFirstCartItemName();
        expect(firstItemName).toBe('Sauce Labs Backpack');
    });
});