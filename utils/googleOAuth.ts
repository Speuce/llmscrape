import { Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const cookiesPath = path.resolve(__dirname, '../cookies.json');
export async function signInGoogleOAuth(page: Page){
    if(!process.env.GOOGLE_OAUTH_USERNAME || !process.env.GOOGLE_OAUTH_PASSWORD){
        //load dotenv
        require('dotenv').config();
    } 
    // check for proper env credentials
    const email = process.env.GOOGLE_OAUTH_USERNAME;
    const password = process.env.GOOGLE_OAUTH_PASSWORD;
    if(!email || !password){
        throw new Error("Please provide proper credentials for Google OAuth in the environment variables GOOGLE_OAUTH_USERNAME and GOOGLE_OAUTH_PASSWORD");
    }
    // fill email
    const emailInput = await page.$('input[type="email"]');
    if(emailInput){
        await emailInput.type(email);
        // press enter
        await emailInput.press('Enter');
    }
    // wait for password input
    await page.waitForSelector('input[type="password"]');
    // fill password
    const passwordInput = await page.waitForSelector('input[type="password"]');
    await passwordInput?.type(password);
    // press enter
    await passwordInput?.press('Enter');
    // wait for 2 seconds
    await page.waitForTimeout(2000);

    const cookies = await page.context().cookies();
    fs.writeFileSync(cookiesPath, JSON.stringify(cookies));
    // save cookies;
}