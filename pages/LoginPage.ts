import { Page } from '@playwright/test';

export class LoginPage {
    static submitLoginButton = (page: Page) => page.getByTestId('login-button');
    static signInUserNameInput = (page: Page) => page.getByTestId('username');
    static signInUserPasswordInput = (page: Page) => page.getByTestId('password');
    static errorMsgButton = (page:Page) => page.getByTestId('error-button');
    static errorSection = (page:Page) => page.getByTestId('error');

    static async loginWithEmail(page: Page, userName: string, password: string) {
        await this.signInUserNameInput(page).fill(userName);
        await this.signInUserPasswordInput(page).fill(password);
        await this.submitLoginButton(page).click();
    }
}
