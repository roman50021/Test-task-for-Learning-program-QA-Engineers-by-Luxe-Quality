import Page from './page.js';

class CheckoutPage extends Page {
    // Поля форми checkout-step-one.html
    get firstNameInput(){
        return $('#first-name');
    }
    get lastNameInput(){
        return $('#last-name');
    }
    get postalCodeInput(){
        return $('#postal-code');
    }

    async fillInformation(first, last, zip) {
        await this.firstNameInput.setValue(first);
        await this.lastNameInput.setValue(last);
        await this.postalCodeInput.setValue(zip);
    }

    get continueButton() {
        return $('#continue');
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    // На наступній сторінці (checkout-step-two.html)
    get finishButton() {
        return $('#finish');
    }
    async clickFinish() {
        await this.finishButton.click();
    }

    // Сторінка checkout-complete.html
    get completeHeader() {
        return $('.complete-header');
    }
    async getCompleteHeaderText() {
        return this.completeHeader.getText();
    }

    get backHomeButton() {
        return $('#back-to-products');
    }
    async clickBackHome() {
        await this.backHomeButton.click();
    }
}

export default new CheckoutPage();