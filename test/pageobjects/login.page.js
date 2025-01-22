import Page from './page.js';


class LoginPage extends Page {

    // Локатори:
    get inputUsername()  {
        return $('#user-name');
    }
    get inputPassword()  {
        return $('#password');
    }
    get btnSubmit()      {
        return $('#login-button');
    }
    get usernameErrorIcon() {
        return $('.error_icon');
    }
    get errorMessageContainer() {
        return $('.error-message-container');
    }

    /**
     * Відкрити сторінку логіна (головну saucedemo)
     */
    async open() {
        await super.open('');
    }

    /**
     * Логін із вказаними юзер/пароль
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * Клік по кнопці «Login» без введення полів
     */
    async submitEmpty() {
        await this.btnSubmit.click();
    }

    /**
     * Отримати, чи відображається іконка помилки біля username
     */
    async isUsernameErrorIconDisplayed() {
        return this.usernameErrorIcon.isDisplayed();
    }

    /**
     * Текст помилки з контейнера
     */
    async getErrorMessage() {
        return this.errorMessageContainer.getText();
    }
}

export default new LoginPage();
