import { test, expect } from '@playwright/test';
import { BingCopilotChat } from '../connectors/bingChat';
import { PerplexityAI } from '../connectors/perplexityAI';
import { YouChat } from '../connectors/youChat';
import { HuggingChat } from '../connectors/huggingChat';

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