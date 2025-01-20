import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

// Test Case 0006
describe('Sorting tests for SauceDemo', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    it('should sort products by "Name (A to Z)"', async () => {
        await InventoryPage.sortBy('Name (A to Z)');
        const itemNames = await InventoryPage.getAllItemNames();
        const sortedNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedNames);
    });

    it('should sort products by "Name (Z to A)"', async () => {
        await InventoryPage.sortBy('Name (Z to A)');
        const itemNames = await InventoryPage.getAllItemNames();
        const sortedNamesDesc = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNamesDesc);
    });

    it('should sort products by "Price (low to high)"', async () => {
        await InventoryPage.sortBy('Price (low to high)');
        const itemPrices = await InventoryPage.getAllItemPrices();
        const sortedAsc = [...itemPrices].sort((a, b) => a - b);
        expect(itemPrices).toEqual(sortedAsc);
    });

    it('should sort products by "Price (high to low)"', async () => {
        await InventoryPage.sortBy('Price (high to low)');
        const itemPrices = await InventoryPage.getAllItemPrices();
        const sortedDesc = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedDesc);
    });
});