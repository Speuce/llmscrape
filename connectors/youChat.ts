import { Page } from "@playwright/test";

export async function YouChat(prompt: string, page: Page){
    // find searchbox with id searchbox
    const searchbox = await page.waitForSelector('#search-input-textarea');
    // type query
    await searchbox?.type(prompt);
    // press enter
    await searchbox?.press('Enter');
    // wait 1 sec for ll to load
    await page.waitForTimeout(2000);
    
    // button with data-testid 'stop-generating-button'
    const button = await page.$('[data-testid="stop-generating-button"]');
  
    // wait until button is removed from the DOM
    await button?.waitForElementState('hidden', {timeout: 60000});
  
    // find div with data-testid = 'youchat-answer-turn-0'
    const botMessageContent = await page?.$('[data-testid="youchat-answer-turn-0"]');
    const outputContent = await botMessageContent?.textContent();
    return outputContent;
}