import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/docs/mdx-components");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("renders the command fixture through the Astro MDX component map", async ({ page }) => {
  const commandBlock = page.locator("[data-code-block-command]").first();

  await expect(commandBlock).toBeVisible();
  await expect(commandBlock.getByRole("tab")).toHaveText(["pnpm", "npm", "yarn", "bun"]);
  await expect(commandBlock.getByRole("tab", { name: "pnpm", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(commandBlock.getByRole("tabpanel")).toHaveText("pnpm dlx shadcn@latest add button");
  await expect(commandBlock.locator("astro-island")).toHaveCount(0);
});

test("renders inline and fenced code through the shared code component", async ({ page }) => {
  await expect(page.locator("p code", { hasText: "class" })).toHaveText("class");
  await expect(page.locator('code[data-language="tsx"]')).toContainText(
    'import { Button } from "~/components/ui/button"',
  );
  await expect(page.locator('code[data-language="tsx"]')).toContainText("<Button>Button</Button>");
});

test("renders every registered prose primitive", async ({ page }) => {
  await Promise.all(
    Array.from({ length: 6 }, (_, index) => {
      const level = index + 1;
      return expect(
        page.getByRole("heading", { level, name: `Heading ${level}`, exact: true }),
      ).toBeVisible();
    }),
  );

  await expect(page.getByRole("link", { name: "Astro documentation" })).toHaveAttribute(
    "href",
    "https://docs.astro.build/",
  );
  await expect(page.locator("strong")).toHaveText("custom styles");
  await expect(page.locator("blockquote")).toContainText("accessible interfaces");
  await expect(page.locator("ul")).toContainText("Accessible by default");
  await expect(page.locator("ol")).toContainText("Install the component");
  await expect(page.getByRole("separator")).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Property" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "variant" })).toBeVisible();
});

test("applies document spacing and code-block padding", async ({ page }) => {
  const measurements = await page.evaluate(() => {
    const commandBlock = document.querySelector<HTMLElement>("[data-code-block-command]");
    const commandFigure = commandBlock?.closest("figure");
    const inlineHeading = [...document.querySelectorAll("h2")].find(
      (heading) => heading.textContent?.trim() === "Inline code",
    );
    const regularCode = document.querySelector<HTMLElement>('code[data-language="tsx"]');
    const regularPre = regularCode?.closest("pre");
    const commandPanelPre = commandBlock?.querySelector<HTMLElement>(
      "[data-command-panel]:not([hidden]) pre",
    );

    if (!commandBlock || !commandFigure || !inlineHeading || !regularPre || !commandPanelPre) {
      throw new Error("Expected MDX code and typography elements were not rendered.");
    }

    return {
      commandParentTag: commandBlock.parentElement?.tagName,
      commandToHeadingGap:
        inlineHeading.getBoundingClientRect().top - commandFigure.getBoundingClientRect().bottom,
      regularPrePaddingInline: getComputedStyle(regularPre).paddingLeft,
      regularPrePaddingBlock: getComputedStyle(regularPre).paddingTop,
      commandPanelPaddingInline: getComputedStyle(commandPanelPre).paddingLeft,
      commandPanelPaddingBlock: getComputedStyle(commandPanelPre).paddingTop,
    };
  });

  expect(measurements.commandParentTag).toBe("FIGURE");
  expect(measurements.commandToHeadingGap).toBeGreaterThanOrEqual(40);
  expect(measurements.regularPrePaddingInline).toBe("16px");
  expect(measurements.regularPrePaddingBlock).toBe("14px");
  expect(measurements.commandPanelPaddingInline).toBe("16px");
  expect(measurements.commandPanelPaddingBlock).toBe("14px");
});

test("switches package-manager commands and remembers the selection", async ({ page }) => {
  const commandBlock = page.locator("[data-code-block-command]").first();

  await commandBlock.getByRole("tab", { name: "yarn", exact: true }).click();
  await expect(commandBlock.getByRole("tabpanel")).toHaveText("yarn dlx shadcn@latest add button");
  await expect(commandBlock.getByRole("tab", { name: "yarn", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await page.reload();
  await expect(commandBlock.getByRole("tab", { name: "yarn", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("supports keyboard navigation between package-manager tabs", async ({ page }) => {
  const commandBlock = page.locator("[data-code-block-command]").first();
  const pnpmTab = commandBlock.getByRole("tab", { name: "pnpm", exact: true });

  await pnpmTab.focus();
  await pnpmTab.press("ArrowRight");
  await expect(commandBlock.getByRole("tab", { name: "npm", exact: true })).toBeFocused();
  await expect(commandBlock.getByRole("tabpanel")).toHaveText("npx shadcn@latest add button");

  await page.keyboard.press("End");
  await expect(commandBlock.getByRole("tab", { name: "bun", exact: true })).toBeFocused();
  await expect(commandBlock.getByRole("tabpanel")).toHaveText(
    "bunx --bun shadcn@latest add button",
  );
});

test("copies the currently selected command", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const commandBlock = page.locator("[data-code-block-command]").first();

  await commandBlock.getByRole("tab", { name: "npm", exact: true }).click();
  await commandBlock.getByRole("button", { name: "Copy command" }).click();

  await expect(commandBlock.getByRole("button", { name: "Command copied" })).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("npx shadcn@latest add button");
});

test("copies an ordinary fenced code block", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  await page.getByRole("button", { name: "Copy code" }).first().click();

  await expect(page.getByRole("button", { name: "Code copied" })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.clipboard.readText()).replace(/\r\n/g, "\n")),
    )
    .toBe('import { Button } from "~/components/ui/button"\n\n<Button>Button</Button>');
});

test("remains usable on a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.reload();

  const commandBlock = page.locator("[data-code-block-command]").first();
  await expect(commandBlock).toBeVisible();
  await expect(commandBlock.getByRole("button", { name: "Copy command" })).toBeVisible();
  await expect(commandBlock.getByRole("tabpanel")).toHaveText("pnpm dlx shadcn@latest add button");
});

test("keeps multiple copy controls isolated and package-manager tabs synchronized", async ({
  context,
  page,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  const commandBlocks = page.locator("[data-code-block-command]");
  const firstCommandBlock = commandBlocks.nth(0);
  const secondCommandBlock = commandBlocks.nth(1);

  await expect(commandBlocks).toHaveCount(2);
  await secondCommandBlock.getByRole("tab", { name: "yarn", exact: true }).click();

  await expect(firstCommandBlock.getByRole("tab", { name: "yarn", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(secondCommandBlock.getByRole("tab", { name: "yarn", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await firstCommandBlock.getByRole("button", { name: "Copy command" }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("yarn dlx shadcn@latest add button");
  await expect(secondCommandBlock.getByRole("button", { name: "Copy command" })).toBeVisible();

  await secondCommandBlock.getByRole("button", { name: "Copy command" }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("yarn add solid-js");

  const codeCopyButtons = page.locator("[data-copy-button]");
  await expect(codeCopyButtons).toHaveCount(2);

  await codeCopyButtons.nth(0).click();
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.clipboard.readText()).replace(/\r\n/g, "\n")),
    )
    .toBe('import { Button } from "~/components/ui/button"\n\n<Button>Button</Button>');

  await page.waitForTimeout(1000);
  await codeCopyButtons.nth(1).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('const multiple = "second"');

  await expect(codeCopyButtons.nth(0)).toHaveAttribute("aria-label", "Copy code", {
    timeout: 1500,
  });
  await expect(codeCopyButtons.nth(1)).toHaveAttribute("aria-label", "Code copied");
});
