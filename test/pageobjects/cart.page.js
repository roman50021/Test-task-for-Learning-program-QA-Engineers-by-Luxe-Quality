import Page from './page.js';

class CartPage extends Page {
    // Кнопка кошика у верхньому правому куті
    get cartIcon() {
        return $('#shopping_cart_container');
    }
    async openCart() {
        await this.cartIcon.click();
    }

    // Елементи всередині кошика
    get cartItems() {
        return $$('.cart_item');
    }
    async getCartItemsCount() {
        const items = await this.cartItems;
        return items.length;
    }

    // Кнопка "Checkout"
    get checkoutButton() {
        return $('#checkout');
    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    // Для тесту з помилкою "Cart is empty"
    get cartError() {
        return $('.cart_error');
    }
    async isCartErrorExisting() {
        return this.cartError.isExisting();
    }
    async getCartErrorText() {
        return this.cartError.getText();
    }

    // Метод, щоб узяти назву першого товару (для прикладу)
    async getFirstCartItemName() {
        const items = await $$('.inventory_item_name');
        if (items.length > 0) {
            return items[0].getText();
        }
        return null;
    }
}

export default new CartPage();