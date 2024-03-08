import { Page } from "@playwright/test";

export async function PerplexityAI(prompt: string, page: Page){
    // find searchbox of type textarea and with placeholder 'Type a message'
    const searchbox = await page.waitForSelector('textarea[placeholder="Ask anything..."]');
    // type query
    await searchbox?.type(prompt);
    // press enter
    await searchbox?.press('Enter');
    // wait 1 sec for ll to load
    await page.waitForTimeout(2000);
  
  
    // locate a button that has nested text 'Rewrite'
    const button = await page.waitForSelector('button:has-text("Rewrite")');
    // wait until button is visible
    await button?.waitForElementState('visible', {timeout: 60000});
  
    // find cib-message with source='bot'
    const botMessage = await page.$('div.prose');

    const outputContent = await botMessage?.textContent();
    return outputContent;
}