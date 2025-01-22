import loginPage from '../pageobjects/login.page.js';

describe('Login tests for SauceDemo', () => {
    // Test Case 0001
    it('should login with valid credentials', async () => {
        // Відкриваємо сторінку
        await loginPage.open();

        // Логін із валідними даними
        await loginPage.login('standard_user', 'secret_sauce');

        // Перевіряємо, що URL містить «inventory.html»
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain('inventory.html');
    });

    // Test Case 0002
    it('should not login with valid username and invalid password', async () => {
        // Відкриваємо сторінку
        await loginPage.open();

        // Логін з валідним іменем користувача і невірним паролем
        await loginPage.login('standard_user', 'wrong_password');

        // Перевіряємо, що іконка "x" для username відображається
        const usernameErrorIcon = await $('.error_icon');
        const isUsernameErrorIconDisplayed = await usernameErrorIcon.isDisplayed();
        expect(isUsernameErrorIconDisplayed).toBe(true);

        // Перевіряємо, що поле username має клас помилки
        const usernameField = await $('#user-name');
        const usernameClass = await usernameField.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        // Перевіряємо, що повідомлення про помилку відображається
        const errorMessage = await $('.error-message-container').getText();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    // Test Case 0003
    it('should not login with valid username and invalid password', async () => {
        // Відкриваємо сторінку
        await loginPage.open();

        // Логін з валідним іменем користувача і невірним паролем
        await loginPage.login('standaD_user', 'wrong_password');

        // Перевіряємо, що іконка "x" для username відображається
        const usernameErrorIcon = await $('.error_icon');
        const isUsernameErrorIconDisplayed = await usernameErrorIcon.isDisplayed();
        expect(isUsernameErrorIconDisplayed).toBe(true);

        // Перевіряємо, що поле username має клас помилки
        const usernameField = await $('#user-name');
        const usernameClass = await usernameField.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        // Перевіряємо, що повідомлення про помилку відображається
        const errorMessage = await $('.error-message-container').getText();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

    // My Test Case
    it('should not login with invalid credentials', async () => {
        // Відкриваємо сторінку
        await loginPage.open();

        // Логін із невірними даними
        await loginPage.login('invalid_user', 'wrong_password');

        // Перевіряємо, що іконка "x" для username відображається
        const usernameErrorIcon = await $('.error_icon');
        const isUsernameErrorIconDisplayed = await usernameErrorIcon.isDisplayed();
        expect(isUsernameErrorIconDisplayed).toBe(true);

        // Перевіряємо, що поле username має клас помилки
        const usernameField = await $('#user-name');
        const usernameClass = await usernameField.getAttribute('class');
        expect(usernameClass).toContain('input_error');

        // Перевіряємо, що повідомлення про помилку відображається
        const errorMessage = await $('.error-message-container').getText();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });

});