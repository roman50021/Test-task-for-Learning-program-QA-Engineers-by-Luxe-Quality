import Page from './page.js';

/**
 * Клас для сторінки логіна
 */
class LoginPage extends Page {
    // Селектори для елементів сторінки
    get inputUsername() {
        return $('#user-name');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('#login-button');
    }

    /**
     * Метод для логіна
     * @param {string} username Ім'я користувача
     * @param {string} password Пароль
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async submitEmpty() {
        // Просто клік по кнопці без setValue
        await this.btnSubmit.click();
    }

    async getErrorMessage() {
        return $('.error-message-container').getText();
    }

}

export default new LoginPage();
