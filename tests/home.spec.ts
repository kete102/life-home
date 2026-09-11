import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders essential information without horizontal overflow", async ({
  page,
}) => {
  await expect(
    page.getByRole("heading", { name: "Una casa para crecer." }),
  ).toBeVisible();
  await expect(page.getByText("Viernes", { exact: true })).toBeVisible();
  await expect(page.getByText("19:45", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Instagram/i })).toHaveAttribute(
    "href",
    /instagram\.com/,
  );
  await expect(
    page.getByRole("link", { name: /C\. Ancha, 21/i }),
  ).toHaveAttribute("href", /maps\.app\.goo\.gl/);

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("has no detectable WCAG A or AA violations", async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
