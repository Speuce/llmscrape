import { Page } from "@playwright/test";

export async function BingCopilotChat(prompt: string, page: Page){
    // find searchbox with id searchbox
    const searchbox = await page.waitForSelector('#searchbox');
    // type query
    await searchbox?.type(prompt);
    // press enter
    await searchbox?.press('Enter');
    // wait 1 sec for ll to load
    await page.waitForTimeout(2000);
  
    // button with id 'stop-responding-button'
    const button = await page.$('#stop-responding-button');
  
    // wait until button is disabled
    await button?.waitForElementState('disabled', {timeout: 60000});
  
    // find cib-message with source='bot'
    const botMessage = await page.$('cib-message[source="bot"]');
    // find div with 'content' class inside
    const botMessageContent = await botMessage?.$('div.content');
    const outputContent = await botMessageContent?.textContent();
    return outputContent;
}