import Page from './page.js';

class InventoryPage extends Page {
    // Меню (бургер) + Logout
    get burgerMenuButton(){
        return $('#react-burger-menu-btn');
    }
    get logoutButton(){
        return $('#logout_sidebar_link');
    }
    async openMenu() {
        await this.burgerMenuButton.click();
    }
    async logout() {
        await this.logoutButton.click();
    }

    // Сортування
    get sortDropdown() {
        return $('.product_sort_container');
    }
    async sortBy(sortText) {
        await this.sortDropdown.selectByVisibleText(sortText);
    }

    // Товари
    get itemNames(){
        return $$('.inventory_item_name');
    }
    get itemPrices(){
        return $$('.inventory_item_price');
    }

    // Кошик (badge)
    get cartBadge() {
        return $('.shopping_cart_badge');
    }
    async getCartBadgeText() {
        return this.cartBadge.getText();
    }

    // Кнопка "Add to cart" для Backpack
    get backpackAddToCartButton() {
        return $('#add-to-cart-sauce-labs-backpack');
    }
    async addBackpackToCart() {
        await this.backpackAddToCartButton.click();
    }

    // Footer links (Twitter, Facebook, LinkedIn)
    get footerTwitterLink(){
        return $('.social_twitter a');
    }
    get footerFacebookLink()  {
        return $('.social_facebook a');
    }
    get footerLinkedInLink(){
        return $('.social_linkedin a');
    }

    async openTwitter() {
        await this.footerTwitterLink.click();
    }
    async openFacebook() {
        await this.footerFacebookLink.click();
    }
    async openLinkedIn() {
        await this.footerLinkedInLink.click();
    }

    // Допоміжні методи для збирання інфо про товари
    async getAllItemNames() {
        const elements = await this.itemNames;
        const names = [];
        for (const el of elements) {
            names.push(await el.getText());
        }
        return names;
    }

    async getAllItemPrices() {
        const elements = await this.itemPrices;
        const prices = [];
        for (const el of elements) {
            const text = await el.getText();
            const numeric = parseFloat(text.replace('$', ''));
            prices.push(numeric);
        }
        return prices;
    }

    // Бургер-меню items (наприклад, якщо треба перевірка кількості пунктів)
    get menuItems() {
        return $$('.bm-item');
    }
    async getMenuItemsCount() {
        const items = await this.menuItems;
        return items.length;
    }
}

export default new InventoryPage();
