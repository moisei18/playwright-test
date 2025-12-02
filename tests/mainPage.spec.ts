import { test, expect } from "@playwright/test";

test("Проверка отображения элементов навигации хедера", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
  await expect(page.getByRole("link", { name: "API" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Node.js" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Community" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "GitHub repository" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discord server" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Switch between dark and light" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Search (Ctrl+K)" })
  ).toBeVisible();
});
test("Проверка названия элементов навигации хедера", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" })
  ).toContainText("Playwright");

  await expect(page.getByRole("link", { name: "Docs" })).toContainText("Docs");
  await expect(page.getByRole("link", { name: "API" })).toContainText("API");
  await expect(page.getByRole("button", { name: "Node.js" })).toContainText(
    "Node.js"
  );
  await expect(page.getByRole("link", { name: "Community" })).toContainText(
    "Community"
  );
});

test("Проверка атрибутов href элементов навигации хедера", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" })
  ).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "Docs" })).toHaveAttribute(
    "href",
    "/docs/intro"
  );
  await expect(page.getByRole("link", { name: "API" })).toHaveAttribute(
    "href",
    "/docs/api/class-playwright"
  );
  await expect(page.getByRole("link", { name: "Community" })).toHaveAttribute(
    "href",
    "/community/welcome"
  );
  await expect(
    page.getByRole("link", { name: "GitHub repository" })
  ).toHaveAttribute("href", "https://github.com/microsoft/playwright");
  await expect(
    page.getByRole("link", { name: "Discord server" })
  ).toHaveAttribute("href", "https://aka.ms/playwright/discord");
});

test("Проверка переключения light mode", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page
    .getByRole("button", { name: "Switch between dark and light" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page
    .getByRole("button", { name: "Switch between dark and light" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("button", { name: "Switch between dark and light" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("Проверка заголовка страниц", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" })
  ).toBeVisible();
  await page
    .getByRole("heading", { name: "Playwright enables reliable" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" })
  ).toContainText(
    "Playwright enables reliable end-to-end testing for modern web apps."
  );
});
