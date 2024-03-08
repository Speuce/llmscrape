import { Page } from "@playwright/test";

export async function ChatSonic(prompt: string, page: Page){
    // check for 'sign in with password' button
    const signinButton = await page.$('button:has-text("Sign in with password")');
    if(signinButton ){
        await signinButton!.click();
        // wait 1 sec
        await page.waitForTimeout(1000);
        if(!process.env.WRITESONIC_USERNAME || !process.env.WRITESONIC_PASSWORD){
            //load dotenv
            require('dotenv').config();
        } 
        // check for proper env credentials
        const email = process.env.WRITESONIC_USERNAME;
        const password = process.env.WRITESONIC_PASSWORD;
        if(!email || !password){
            throw new Error("Please provide proper credentials for WriteSonic in the environment variables WRITESONIC_USERNAME and WRITESONIC_PASSWORD");
        }
        // fill email
        const emailInput = await page.$('input[type="email"]');
        await emailInput!.type(email);
        // fill password
        const passwordInput = await page.$('input[type="password"]');
        await passwordInput?.type(password);
        // click on 'Sign in' button with text strictly equal to 'Sign in'
        const innerSignInButton = await page.$('button:has-text("Sign in"):not(:has-text("with"))');
        await innerSignInButton?.click();
        // wait for 2 seconds
        await page.waitForTimeout(2000);
    }
    // find searchbox of type textarea and with placeholder 'Type a message'
    const searchbox = await page.waitForSelector('textarea[placeholder="How can I help?"]');
    // find button with disabled=""
    const disabledButton = await page.$('button[disabled=""]');
    // type query
    await searchbox?.type(prompt);
    // press enter
    await searchbox?.press('Enter');
    //check for 'dismiss' button and click if it exists
    const dismissButton = await page.$('button:has-text("dismiss")');
    if(dismissButton){
        await dismissButton.click();
    }
    // wait 1 sec for ll to load
    await page.waitForTimeout(2000);
  
  
    // wait for disabled button to become disabled again
    await disabledButton?.waitForElementState('disabled', {timeout: 60000});
  
    // find cib-message with source='bot'
    const botMessage = await page.$('div.prose');

    const outputContent = await botMessage?.textContent();
    return outputContent;
}