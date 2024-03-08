import { Page } from "@playwright/test";
import { signInGoogleOAuth } from "../utils/googleOAuth";

export async function GeminiChat(prompt: string, page: Page){
    const signinButton = await page.$('button:has-text("Sign in")');
    if(signinButton ){
        await signinButton.click();
        // wait 1 sec
        await page.waitForTimeout(1000);
        await signInGoogleOAuth(page);
    }
    const chatWithGeminiButton = await page.$('button:has-text("Chat with Gemini")');
    if(chatWithGeminiButton){
        await chatWithGeminiButton.click();
        await page.waitForTimeout(1000);
    }
    //check for TOS aggrement, and scroll to bottom and accept
    //tos is present if .tos-container class is present
    const tos = await page.$('.tos-container');
    if(tos){
        //find scrollable element with data-test-id="scrollable-content"
        const scrollableElement = await page.$('[data-test-id="scrollable-content"]');
        //scroll to bottom
        await scrollableElement?.evaluate((e) => {
            e.scrollTop = e.scrollHeight;
        });
        //click on agree
        const agreeButton = await page.$('button:has-text("I agree")');
        await agreeButton?.click();
        await page.waitForTimeout(1000);
    }
    // look for 'continue' button, if so click it
    const continueButton = await page.$('button:has-text("Continue")');
    if(continueButton){
        await continueButton.click();
        await page.waitForTimeout(1000);
    }
    // find searchbox with type rich-textarea
    const searchbox = await page.$('rich-textarea');
    // type query
    await searchbox?.type('Playwright');
    // press enter
    await searchbox?.press('Enter');
    // wait 1 sec for ll to load
    await page.waitForTimeout(2000);
  
    // button with aria-label='Send Message'
    const button = await page.$('.send-button-container');
  
    // wait until button no longer visible
    await button?.waitForElementState('hidden');
  
    // find bot response with element message-content and class model-response-text
    const botMessage = await page.$('.model-response-text');
    // find div with 'content' class inside
    const outputContent = await botMessage?.textContent();
    return outputContent;
}