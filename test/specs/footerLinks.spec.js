import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

//Test Case 0007
describe('Footer links tests for SauceDemo', () => {
    let originalHandle;

    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // Запам'ятовуємо хендл
        originalHandle = await browser.getWindowHandle();
    });

    afterEach(async () => {
        // Закриваємо зайві вкладки
        const allHandles = await browser.getWindowHandles();
        for (const h of allHandles) {
            if (h !== originalHandle) {
                await browser.switchToWindow(h);
                await browser.closeWindow();
            }
        }
        await browser.switchToWindow(originalHandle);
    });

    it('should open Twitter link in a new tab', async () => {
        await inventoryPage.openTwitter(); // замість $('.social_twitter a').click()

        const allHandles = await browser.getWindowHandles();
        expect(allHandles.length).toBeGreaterThan(1);

        let newHandle;
        for (const h of allHandles) {
            if (h !== originalHandle) {
                newHandle = h;
                break;
            }
        }
        await browser.switchToWindow(newHandle);

        const newUrl = await browser.getUrl();
        expect(newUrl).toMatch(/(twitter\.com|x\.com)/);
    });

    it('should open Facebook link in a new tab', async () => {
        await browser.switchToWindow(originalHandle);
        await inventoryPage.openFacebook();

        const allHandles = await browser.getWindowHandles();
        expect(allHandles.length).toBeGreaterThan(1);

        let newHandle;
        for (const h of allHandles) {
            if (h !== originalHandle) {
                newHandle = h;
                break;
            }
        }
        await browser.switchToWindow(newHandle);

        const newUrl = await browser.getUrl();
        expect(newUrl).toContain('facebook.com');
    });

    it('should open LinkedIn link in a new tab', async () => {
        await browser.switchToWindow(originalHandle);
        await inventoryPage.openLinkedIn();

        const allHandles = await browser.getWindowHandles();
        expect(allHandles.length).toBeGreaterThan(1);

        let newHandle;
        for (const h of allHandles) {
            if (h !== originalHandle) {
                newHandle = h;
                break;
            }
        }
        await browser.switchToWindow(newHandle);

        const newUrl = await browser.getUrl();
        expect(newUrl).toContain('linkedin.com');
    });
});