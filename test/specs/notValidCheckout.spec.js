import loginPage from '../pageobjects/login.page.js';

// Test Case 0009 with bug
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

        await $('#shopping_cart_container').click();
        url = await browser.getUrl();
        expect(url).toContain('/cart.html');

        const cartItems = await $$('.cart_item');
        expect(cartItems.length).toBe(0);

        await $('#checkout').click();

        // ---- Ось головне: перевірка помилки ----

        // Переконуємось, що залишилися на cart.html (або якщо має відкриватися інша сторінка,
        // але з помилкою — коригуємо під фактичну поведінку)
        url = await browser.getUrl();
        expect(url).toContain('/cart.html');

        // Шукаємо блок з повідомленням про помилку
        // Якщо у вашій верстці поки немає реального елемента —
        // додайте тестовий селектор (наприклад .cart_error). Нехай поки що тест “падає”,
        // доки розробники не реалізують це повідомлення.
        const errorMsg = await $('.cart_error');

        // Перевіряємо, що елемент існує і відображає потрібний текст
        const isErrorExisting = await errorMsg.isExisting();
        expect(isErrorExisting).toBe(true);

        const text = await errorMsg.getText();
        expect(text).toContain('Cart is empty');
    });
});
