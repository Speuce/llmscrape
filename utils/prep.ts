import { Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BingCopilotChat } from '../connectors/bingChat';
import { PerplexityAI } from '../connectors/perplexityAI';
import { YouChat } from '../connectors/youChat';
import { HuggingChat } from '../connectors/huggingChat';
import { GeminiChat } from '../connectors/geminiCHat';
import { beforeEach } from 'node:test';
import path from 'path';
import fs from 'fs';
import { ChatSonic } from '../connectors/chatSonic';
import { ChatGPT } from '../connectors/chatGPT';
import { processCsvFile } from '../utils/jailbreakcsv';

export async function runBingCopilotChat(page: Page, prompts: string[]){
    const results = [] as string[];
    for(const prompt of prompts){
        try{
            await page.goto('https://www.bing.com/chat');
            const result = await BingCopilotChat(prompt, page) ?? 'NR';
            results.push(result);
        }catch(e){
            console.log(e);
            results.push('ERR');
        }

    }
    return results;
}
export async function runPerplexityAI(page: Page, prompts: string[]){
    const results = [] as string[];
    for(const prompt of prompts){
        try{
            await page.goto('https://perplexity.ai/');
            const result = await PerplexityAI(prompt, page) ?? 'NR';
            results.push(result);
        }catch(e){
            console.log(e);
            results.push('ERR');
        }
    }
    return results;
}
  
export async function runYouChat(page: Page, prompts: string[]){
    const results = [] as string[];
    for(const prompt of prompts){
        try{
            await page.goto('https://you.com/');
            const result = await YouChat(prompt, page) ?? 'NR';
            results.push(result);
        }catch(e){
            console.log(e);
            results.push('ERR');
        }
    }
    return results;
}
export async function runHuggingChat(page: Page, prompts: string[]){
    const results = [] as string[];
    for(const prompt of prompts){
        try{
            await page.goto('https://huggingface.co/chat');
            const result = await HuggingChat(prompt, page) ?? 'NR';
            results.push(result);
        }catch(e){
            console.log(e);
            results.push('ERR');
        }
    }
    return results;
}
  
export async function runGemniChat(page: Page, prompts: string[]){
    const results = [] as string[];
    for(const prompt of prompts){
        try{
            await page.goto('https://gemini.google.com/');
            const result = await GeminiChat(prompt, page) ?? 'NR';
            results.push(result);
        }catch(e){
            console.log(e);
            results.push('ERR');
        }
    }
    return results;
}
  
export async function runWriteSonic(page: Page, prompts: string[]){
    const results = [] as string[];
    for(const prompt of prompts){
        try{
            await page.goto('https://app.writesonic.com/template/a2f586b5-1eba-4178-9217-f8e0efefec6c/chatsonic/2a3445dd-9114-4314-bd61-930f6adcba04?l_h=undefined');
            const result = await ChatSonic(prompt, page) ?? 'NR';
            results.push(result);
        }catch(e){
            console.log(e);
            results.push('ERR');
        }
    }
    return results;
}