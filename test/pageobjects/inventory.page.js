import { $ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage extends Page {
    get burgerMenuButton() {
        return $('#react-burger-menu-btn');
    }
    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    async openMenu() {
        await this.burgerMenuButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}

export default new InventoryPage();

