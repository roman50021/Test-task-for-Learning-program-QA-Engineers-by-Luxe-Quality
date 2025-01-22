import loginPage  from '../pageobjects/login.page.js';

// Test Case 0008
describe('Valid Checkout flow', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory.html');
    });

    it('should successfully checkout an item', async () => {
        // 1) Додаємо товар у кошик
        await $('#add-to-cart-sauce-labs-backpack').click();

        // Перевірка, що значок кошика = "1"
        const cartBadgeText = await $('.shopping_cart_badge').getText();
        expect(cartBadgeText).toContain('1');

        // 2) Переходимо в кошик
        await $('#shopping_cart_container').click();
        // Перевіряємо URL
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/cart.html');

        // 3) "Checkout"
        await $('#checkout').click();

        // 4) Заповнюємо поля
        await $('#first-name').setValue('Roman');
        await $('#last-name').setValue('Fedko');
        await $('#postal-code').setValue('12434');

        // 5) Кнопка "Continue"
        await $('#continue').click();

        // Перевірка URL
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/checkout-step-two.html');

        // 6) Завершуємо покупки
        await $('#finish').click();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/checkout-complete.html');

        // Перевірка фінального тексту
        const headerText = await $('.complete-header').getText();
        expect(headerText).toContain('Thank you for your order!');

        // 7) "Back Home"
        await $('#back-to-products').click();

        // Перевірка, що знову на inventory і кошик порожній
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory.html');

        const cartBadgeAfter = await $('.shopping_cart_badge').isExisting();
        expect(cartBadgeAfter).toBe(false);
    });
});
