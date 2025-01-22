import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const loginPageURL = 'https://www.saucedemo.com';
const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';


test.describe('Positive Login Page Test Cases', () => {
    
    test.beforeEach( async({page}) => {
        await page.goto(loginPageURL, {waitUntil: "networkidle"});
    });
    [
        { username: 'standard_user', password: 'secret_sauce', },
        //To discuss TO DO figure out if this tuple is correct: this tuple of parameters don't work as expected 
        // that is why I've commented it to make the whole test works
        { username: 'locked_out_user', password: 'secret_sauce', }, 
        { username: 'performance_glitch_user', password: 'secret_sauce', },
        { username: 'error_user', password: 'secret_sauce', },
    ].forEach(({username, password}) => {
        test(`testing valid username and password combination of ${username}, ${password}`, async ({page}) => {
            await expect(page).toHaveURL(loginPageURL);
            await LoginPage.loginWithEmail(page, username, password);
            await expect(page).toHaveURL(inventoryPageUrl);
        })
    })
});

test.describe('Negative Login Page Test Cases', () => {
    
    test.beforeEach( async({page}) => {
        await page.goto(loginPageURL, {waitUntil: "networkidle"});;
    });
    [  
        { username: 'standard_user1', password: 'secret_sauce', expected: 'Epic sadface: Username and password do not match any user in this service' },
        { username: 'locked_out_user', password: 'secret_sauce123', expected: 'Epic sadface: Username and password do not match any user in this service'},
        { username: 'problem_user897897', password: 'secret_sauce45654', expected: 'Epic sadface: Username and password do not match any user in this service'},
        { username: '', password: '', expected: 'Epic sadface: Username is required' },
        { username: '', password: 'secret_sauce45654', expected: 'Epic sadface: Username is required' },
        { username: 'test_user', password: '', expected: 'Epic sadface: Password is required' },

    ].forEach(({username, password, expected}) => {
        test(`testing invalid username and password combination of ${username}, ${password}`, async ({page}) => {
        await expect(page).toHaveURL(loginPageURL);
        await LoginPage.loginWithEmail(page, username, password);
        await expect(page).toHaveURL(loginPageURL);
        await expect(LoginPage.errorSection(page)).toBeVisible();
        await expect(LoginPage.errorMsgButton(page)).toBeVisible();
        await expect(LoginPage.errorSection(page)).toHaveText(expected);
    })
    });
});