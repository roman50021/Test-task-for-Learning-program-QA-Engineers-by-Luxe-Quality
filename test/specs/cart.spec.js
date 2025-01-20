import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

// Test Case 0005
describe('Cart tests for SauceDemo', () => {
    it('should keep items in cart after logout and login', async () => {

        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');

        let currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // У Selenium/WebdriverIO $('#someId') означає «Знайти елемент з id="someId"».
        // У WebdriverIO $('.some-class') означає «Знайти елемент з class="some-class"».
        const addToCartButton = await $('#add-to-cart-sauce-labs-backpack');
        await addToCartButton.click();

        const cartBadge = await $('.shopping_cart_badge');
        expect(await cartBadge.getText()).toBe('1');

        await InventoryPage.openMenu();
        const menuItems = await $$('.bm-item');
        expect(menuItems.length).toBe(4);

        await InventoryPage.logout();
        currentUrl = await browser.getUrl();
        expect(currentUrl).toBe('https://www.saucedemo.com/');

        const usernameValue = await LoginPage.inputUsername.getValue();
        const passwordValue = await LoginPage.inputPassword.getValue();
        expect(usernameValue).toBe('');
        expect(passwordValue).toBe('');

        await LoginPage.login('standard_user', 'secret_sauce');
        currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        const cartBadgeAgain = await $('.shopping_cart_badge');
        expect(await cartBadgeAgain.getText()).toBe('1');

        const cartIcon = await $('#shopping_cart_container');
        await cartIcon.click();

        const cartItemName = await $('.inventory_item_name').getText();
        expect(cartItemName).toBe('Sauce Labs Backpack');
    });
});