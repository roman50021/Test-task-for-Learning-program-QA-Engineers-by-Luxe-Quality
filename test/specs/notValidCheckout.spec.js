import loginPage from '../pageobjects/login.page.js';
import cartPage from '../pageobjects/cart.page.js';

//Test Case 0009
describe('Checkout without products (error on cart)', () => {

    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    it('should display an error on cart page if no items in cart', async () => {
        let url = await browser.getUrl();
        expect(url).toContain('/inventory.html');

        // Відкрити кошик
        await cartPage.openCart();
        url = await browser.getUrl();
        expect(url).toContain('/cart.html');

        const count = await cartPage.getCartItemsCount();
        expect(count).toBe(0);

        // Натискаємо checkout
        await cartPage.clickCheckout();

        // Переконуємось, що лишилися на cart.html (з помилкою)
        url = await browser.getUrl();
        expect(url).toContain('/cart.html');

        // Перевірка блоку з помилкою
        const isErrorExisting = await cartPage.isCartErrorExisting();
        expect(isErrorExisting).toBe(true);

        const text = await cartPage.getCartErrorText();
        expect(text).toContain('Cart is empty');
    });
});