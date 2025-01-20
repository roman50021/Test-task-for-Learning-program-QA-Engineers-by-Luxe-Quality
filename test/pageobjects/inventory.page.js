import { $ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage extends Page {
    get burgerMenuButton() {
        return $('#react-burger-menu-btn');
    }
    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    // Випадаючий список сортування
    get sortDropdown() {
        return $('.product_sort_container');
    }

    // Елементи з назвами товарів
    get itemNames() {
        return $$('.inventory_item_name');
    }

    // Елементи з цінами товарів
    get itemPrices() {
        return $$('.inventory_item_price');
    }

    async openMenu() {
        await this.burgerMenuButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

    get footerTwitterLink() {
        return $('.social_twitter');
    }
    get footerFacebookLink() {
        // перевірити фактичний клас
        return $('.social_facebook');
    }
    get footerLinkedInLink() {
        return $('.social_linkedin');
    }

    //Обрати потрібну опцію сортування (за видимим текстом у dropdown).
    async sortBy(sortText) {
        await this.sortDropdown.selectByVisibleText(sortText);
        // (За потреби можна додати waitFor або паузу, якщо треба дочекатися оновлення сторінки)
    }


    // Отримати всі назви товарів у вигляді масиву рядків.
    async getAllItemNames() {
        const elements = await this.itemNames; // масив елементів
        const names = [];
        for (const el of elements) {
            names.push(await el.getText());
        }
        return names;
    }

    // Отримати всі ціни товарів у вигляді масиву чисел.
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
}

export default new InventoryPage();

