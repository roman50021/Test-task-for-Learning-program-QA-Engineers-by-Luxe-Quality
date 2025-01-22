import loginPage from '../pageobjects/login.page.js';
import inventoryPage  from '../pageobjects/inventory.page.js';

// Test Case 0006
describe('Sorting tests for SauceDemo', () => {

    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    it('should sort products by "Name (A to Z)"', async () => {
        await inventoryPage.sortBy('Name (A to Z)');
        const itemNames = await inventoryPage.getAllItemNames();
        const sortedNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedNames);
    });

    it('should sort products by "Name (Z to A)"', async () => {
        await inventoryPage.sortBy('Name (Z to A)');
        const itemNames = await inventoryPage.getAllItemNames();
        const sortedNamesDesc = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNamesDesc);
    });

    it('should sort products by "Price (low to high)"', async () => {
        await inventoryPage.sortBy('Price (low to high)');
        const itemPrices = await inventoryPage.getAllItemPrices();
        const sortedAsc = [...itemPrices].sort((a, b) => a - b);
        expect(itemPrices).toEqual(sortedAsc);
    });

    it('should sort products by "Price (high to low)"', async () => {
        await inventoryPage.sortBy('Price (high to low)');
        const itemPrices = await inventoryPage.getAllItemPrices();
        const sortedDesc = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedDesc);
    });
});