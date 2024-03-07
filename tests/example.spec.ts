import { test, expect } from '@playwright/test';
import { BingCopilotChat } from '../connectors/bingChat';
import { PerplexityAI } from '../connectors/perplexityAI';

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

