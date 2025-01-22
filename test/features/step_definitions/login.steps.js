import { Given, When, Then } from '@wdio/cucumber-framework';
import loginPage from '../../pageobjects/login.page.js';

Given('User is located on the main page of saucedemo website', async () => {
    await loginPage.open();
});

When('User clicks {string} button', async (buttonName) => {
    if (buttonName === 'Login') {
        await loginPage.submitEmpty();
    }
});

Then('User should see {string} error message', async (expectedMessage) => {
    const actualError = await loginPage.getErrorMessage();
    expect(actualError).toContain(expectedMessage);

});
