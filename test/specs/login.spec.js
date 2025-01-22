import loginPage from '../pageobjects/login.page.js';

//Test Case 0001-0003
describe('Login tests for SauceDemo', () => {

    it('should login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    it('should not login with valid username and invalid password', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'wrong_password');

        const isIconDisplayed = await loginPage.isUsernameErrorIconDisplayed();
        expect(isIconDisplayed).toBe(true);

        const usernameClass = await loginPage.inputUsername.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user');
    });

    it('should not login with valid username and invalid password', async () => {
        await loginPage.open();
        await loginPage.login('standaD_user', 'wrong_password');

        const isIconDisplayed = await loginPage.isUsernameErrorIconDisplayed();
        expect(isIconDisplayed).toBe(true);

        const usernameClass = await loginPage.inputUsername.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user');
    });

    it('should not login with invalid credentials', async () => {
        await loginPage.open();
        await loginPage.login('invalid_user', 'wrong_password');

        const isIconDisplayed = await loginPage.isUsernameErrorIconDisplayed();
        expect(isIconDisplayed).toBe(true);

        const usernameClass = await loginPage.inputUsername.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user');
    });

});