import { Page } from "@playwright/test";

export async function HuggingChat(prompt: string, page: Page){
    // check for "Try as guest" button, if exists, click it
    const tryAsGuest = await page.$('button:has-text("Try as guest")');
    if(tryAsGuest){
        await tryAsGuest.click();
        // wait 1 sec
        await page.waitForTimeout(1000);
    }
    // find textarea with placeholder "Ask anything"
    const searchbox = await page.waitForSelector('textarea[placeholder="Ask anything"]');
    
    // type query
    await searchbox?.type('Playwright');
    // press enter
    await searchbox?.press('Enter');
    // wait 1 sec for ll to load
    await page.waitForTimeout(2000);
  
    // button with text "Stop generating"
  
    // wait until button is detatched from DOM
    await page.waitForSelector('button:has-text("Stop generating")', {state: 'detached', timeout: 60000});
    // find cib-message with source='bot'
    const botMessage = await page.$('div.prose');

    const outputContent = await botMessage?.textContent();
    return outputContent;
}