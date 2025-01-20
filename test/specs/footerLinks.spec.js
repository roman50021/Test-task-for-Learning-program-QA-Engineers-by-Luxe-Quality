import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';

// Test Case 0007
describe('Footer links tests for SauceDemo', () => {
    let originalHandle;

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');

        // ОТУТ зберігаємо хендл оригінальної вкладки:
        originalHandle = await browser.getWindowHandle();
    });

    afterEach(async () => {
        // На випадок, якщо ми залишилися в новій вкладці, повернемося на оригінальну
        const allHandles = await browser.getWindowHandles();
        for (const h of allHandles) {
            if (h !== originalHandle) {
                // Закриваємо зайву вкладку
                await browser.switchToWindow(h);
                await browser.closeWindow();
            }
        }
        // Повертаємося на вихідну вкладку (щоб інші тести не «застрягли»)
        await browser.switchToWindow(originalHandle);
    });

    it('should open Twitter link in a new tab', async () => {
        // Клік по Twitter (class="social_twitter" → туди вкладене <a/>)
        const twitterLink = await $('.social_twitter a');
        await twitterLink.click();

        const allHandles = await browser.getWindowHandles();
        expect(allHandles.length).toBeGreaterThan(1);

        // Шукаємо handle, який не дорівнює оригінальному
        let newHandle;
        for (const h of allHandles) {
            if (h !== originalHandle) {
                newHandle = h;
                break;
            }
        }
        // Перемикаємося:
        await browser.switchToWindow(newHandle);

        // Перевіряємо URL
        const newUrl = await browser.getUrl();
        expect(newUrl).toMatch(/(twitter\.com|x\.com)/);
    });

    it('should open Facebook link in a new tab', async () => {
        // Повертаємося на вихідну вкладку (раптом лишилися в попередньому тесті?)
        await browser.switchToWindow(originalHandle);

        const facebookLink = await $('.social_facebook a');
        await facebookLink.click();

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

        const linkedInLink = await $('.social_linkedin a');
        await linkedInLink.click();

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