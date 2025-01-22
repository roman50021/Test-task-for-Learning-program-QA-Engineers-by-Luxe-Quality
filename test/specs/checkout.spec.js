import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';

//Test Case 0008
describe('Valid Checkout flow', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory.html');
    });

    it('should successfully checkout an item', async () => {
        // 1) Додаємо товар у кошик
        await inventoryPage.addBackpackToCart();

        // Перевірка, що значок кошика = "1"
        expect(await inventoryPage.getCartBadgeText()).toContain('1');

        // 2) Переходимо в кошик
        await cartPage.openCart();
        let currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/cart.html');

        // 3) "Checkout"
        await cartPage.clickCheckout();

        // 4) Заповнюємо поля
        await checkoutPage.fillInformation('Roman', 'Fedko', '12434');

        // 5) Кнопка "Continue"
        await checkoutPage.clickContinue();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/checkout-step-two.html');

        // 6) Завершуємо покупки
        await checkoutPage.clickFinish();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/checkout-complete.html');

        // Перевірка фінального тексту
        const headerText = await checkoutPage.getCompleteHeaderText();
        expect(headerText).toContain('Thank you for your order!');

        // 7) "Back Home"
        await checkoutPage.clickBackHome();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('/inventory.html');

        // Перевірка, що тепер кошик порожній
        const badgeExists = await inventoryPage.cartBadge.isExisting();
        expect(badgeExists).toBe(false);
    });
});