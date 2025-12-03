import { test, expect, Page, Locator } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  href?: string;
}

// 1. Обновленная структура данных с добавлением ожидаемых href
const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo Playwright",
    text: "Playwright",
    href: "/",
  },
  {
    locator: (page: Page): Locator => page.getByRole("link", { name: "Docs" }),
    name: "Docs",
    text: "Docs",
    href: "/docs/intro",
  },
  {
    locator: (page: Page): Locator => page.getByRole("link", { name: "API" }),
    name: "API",
    text: "API",
    href: "/docs/api/class-playwright",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: "Node.js" }),
    name: "Node.js",
    text: "Node.js",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Community" }),
    name: "Community",
    text: "Community",
    href: "/community/welcome",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "GitHub repository" }),
    name: "GitHub repository",
    href: "https://github.com/microsoft/playwright",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("link", { name: "Discord server" }),
    name: "Discord server",
    href: "https://aka.ms/playwright/discord",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: "Switch between dark and light" }),
    name: "Switch between dark and light",
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole("button", { name: "Search (Ctrl+K)" }),
    name: "Search (Ctrl+K)",
  },
];

test.describe("Тесты главной страницы Playwright", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });

  // 2. Исправленный цикл: используем for...of для последовательного await
  test("Проверка отображения элементов навигации хедера", async ({ page }) => {
    for (const { locator, name } of elements) {
      await test.step(`Проверка отображения элемента: ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    }
  });

  // 3. Исправленный цикл: используем for...of для последовательного await и проверки текста
  test("Проверка текста элементов навигации хедера", async ({ page }) => {
    for (const { locator, name, text } of elements) {
      if (text) {
        await test.step(`Проверка текста элемента: ${name}`, async () => {
          await expect(locator(page)).toHaveText(text);
        });
      }
    }
  });

  // 4. Улучшенный тест href: использует данные из массива elements
  test("Проверка атрибутов href элементов навигации хедера", async ({
    page,
  }) => {
    for (const { locator, name, href } of elements) {
      if (href) {
        // Проверяем только элементы, у которых есть атрибут href
        await test.step(`Проверка href элемента: ${name} на ${href}`, async () => {
          await expect(locator(page)).toHaveAttribute("href", href);
        });
      }
    }
  });

  test("Проверка переключения темной/светлой темы (light mode)", async ({
    page,
  }) => {
    const themeSwitcher = page.getByRole("button", {
      name: "Switch between dark and light",
    });
    const htmlTag = page.locator("html");

    // 1. Переключение: Dark -> Light
    await test.step("Переключение в Light mode", async () => {
      await themeSwitcher.click();
      await expect(htmlTag).toHaveAttribute("data-theme", "light");
    });

    // 2. Переключение: Light -> Dark
    await test.step("Переключение в Dark mode", async () => {
      await themeSwitcher.click();
      await expect(htmlTag).toHaveAttribute("data-theme", "dark");
    });

    // 3. Переключение: Dark -> Light (Проверка обратного действия)
    await test.step("Проверка повторного переключения в Light mode", async () => {
      await themeSwitcher.click();
      await expect(htmlTag).toHaveAttribute("data-theme", "light");
    });
  });

  // 5. Улучшенный тест заголовка: удален ненужный click
  test("Проверка основного заголовка (Hero Heading) на главной странице", async ({
    page,
  }) => {
    const heroHeading = page.getByRole("heading", {
      name: "Playwright enables reliable",
    });

    await test.step("Проверка видимости заголовка", async () => {
      await expect(heroHeading).toBeVisible();
    });

    await test.step("Проверка полного текста заголовка", async () => {
      await expect(heroHeading).toContainText(
        "Playwright enables reliable end-to-end testing for modern web apps."
      );
    });
  });
});
