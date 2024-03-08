import { test, expect } from '@playwright/test';
import { BingCopilotChat } from '../connectors/bingChat';
import { PerplexityAI } from '../connectors/perplexityAI';
import { YouChat } from '../connectors/youChat';
import { HuggingChat } from '../connectors/huggingChat';
import { GeminiChat } from '../connectors/geminiCHat';
import { beforeEach } from 'node:test';
import path from 'path';
import fs from 'fs';

const cookiesPath = path.resolve(__dirname, '../cookies.json')
test.beforeEach(async ({ page }) => {
  // Check if the cookies file exists
  if (fs.existsSync(cookiesPath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
    await page.context().addCookies(cookies);
  }
});

test('Bing Copilot Chat', async ({ page }) => {
  await page.goto('https://www.bing.com/chat');
  // todo fetch prompts from spreadsheet and iterate
  const result = await BingCopilotChat('Playwright', page);
  // todo track results somewhere
  expect(result).toBeDefined();
  expect(result!.length).toBeGreaterThan(0);
});

test('Perplexity AI', async ({ page }) => {
  await page.goto('https://perplexity.ai/');
  // todo fetch prompts from spreadsheet and iterate
  const result = await PerplexityAI('Playwright', page);
  // todo track results somewhere
  expect(result).toBeDefined();
  expect(result!.length).toBeGreaterThan(0);
});

test('YouChat', async ({ page }) => {
  await page.goto('https://you.com/');
  // todo fetch prompts from spreadsheet and iterate
  const result = await YouChat('Playwright', page);
  // todo track results somewhere
  expect(result).toBeDefined();
  expect(result!.length).toBeGreaterThan(0);
}
);
test('Hugging Chat', async ({ page }) => {
  await page.goto('https://huggingface.co/chat');
  // todo fetch prompts from spreadsheet and iterate
  const result = await HuggingChat('Playwright', page);
  // todo track results somewhere
  expect(result).toBeDefined();
  expect(result!.length).toBeGreaterThan(0);
}
);

test('Gemini Chat', async ({ page }) => {
  await page.goto('https://gemini.google.com/');
  // todo fetch prompts from spreadsheet and iterate
  const result = await GeminiChat('Playwright', page);
  const cookies = await page.context().cookies();
  fs.writeFileSync(cookiesPath, JSON.stringify(cookies));
  // todo track results somewhere
  expect(result).toBeDefined();
  expect(result!.length).toBeGreaterThan(0);
}
);