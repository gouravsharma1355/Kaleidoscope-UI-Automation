import { Page, expect } from "@playwright/test";
import path from "path";

export async function uploadFileUtil(
  page: Page,
  fileName: string,
  fileInputSelector: string = 'input[type="file"]',
  verifyText: string = fileName
) {
  const filePath = path.resolve(__dirname, `../test_data/${fileName}`);

  await page.locator(fileInputSelector).setInputFiles(filePath);

  await expect(
    page.getByRole("button", { name: verifyText })
  ).toBeVisible({ timeout: 10000 });
}
