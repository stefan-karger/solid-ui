import { expect, test } from "@playwright/test"

import { styles } from "../apps/docs/src/lib/appearance"

test("bootstraps hydration before serialized lazy island data", async ({ request }) => {
  const response = await request.get("/docs/components/label/")
  expect(response.status()).toBe(200)
  const html = await response.text()
  const bootstrap = html.indexOf("window._$HY||")
  const serialized = html.indexOf("_$HY.r[")
  expect(bootstrap).toBeGreaterThanOrEqual(0)
  expect(serialized).toBeGreaterThanOrEqual(0)
  expect(bootstrap).toBeLessThan(html.indexOf("</head>"))
  expect(bootstrap).toBeLessThan(serialized)
})

test("navigates docs with an active sidebar and working page contents", async ({ page }) => {
  await page.goto("/docs/components/switch/")
  const sidebar = page.getByRole("navigation", { name: "Documentation", exact: true })
  await expect(sidebar.getByRole("link", { name: "Switch", exact: true })).toHaveAttribute(
    "aria-current",
    "page"
  )
  const toc = page
    .getByRole("navigation", { name: "On this page", exact: true })
    .filter({ visible: true })
  const usage = toc.getByRole("link", { name: "Usage", exact: true })
  await usage.click()
  await expect(page).toHaveURL(/#usage$/)
  await expect(usage).toHaveAttribute("aria-current", "location")
  expect(
    await page.locator("[data-docs-header]").evaluate((node) => node.getBoundingClientRect().top)
  ).toBe(0)
  await sidebar.getByRole("link", { name: "Button", exact: true }).click()
  await expect(page.getByRole("heading", { name: "Button", level: 1 })).toBeVisible()
})

test("shows the component command and manual dependency in installation tabs", async ({ page }) => {
  await page.goto("/docs/components/attachment/")
  const installation = page.locator("article [data-slot='code-tabs']")
  const command = installation.getByRole("tab", { name: "Command", exact: true })
  const manual = installation.getByRole("tab", { name: "Manual", exact: true })
  const source = installation.locator('[data-registry-path="ui/attachment.tsx"]')
  await expect(command).toHaveAttribute("aria-selected", "true")
  await expect(installation.locator("[data-command-panel]:visible")).toHaveText(
    "pnpm dlx solidui-cli@latest add attachment"
  )
  await command.focus()
  await page.keyboard.press("ArrowRight")
  await expect(manual).toHaveAttribute("aria-selected", "true")
  await expect(installation.locator("[data-command-panel]:visible")).toHaveText(
    "pnpm dlx solidui-cli@latest add button"
  )
  await expect(source).toBeVisible()
})

test("persists style and color mode and offers matching registry source", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/docs/components/switch/")
  const header = page.locator("[data-docs-header]")
  await expect(header.locator("astro-island[ssr]")).toHaveCount(0, { timeout: 30_000 })
  await header.getByRole("combobox", { name: "Preview style" }).click()
  await page.getByRole("option", { name: /^lyra$/i }).click()
  await expect(page.locator("html")).toHaveAttribute("data-docs-style", "lyra")
  await header.getByRole("switch", { name: "Dark mode" }).check()
  await expect(page.locator("html")).toHaveClass(/dark/)
  const source = page.locator('[data-registry-path="ui/switch.tsx"]')
  await expect(source).toHaveAttribute("data-source-style", "lyra", { timeout: 30_000 })
  const code = await source.locator("[data-copy-button]").getAttribute("data-copy-value")
  expect(code).toContain("rounded-full")
  await page.goto("/docs/components/button/")
  await expect(page.locator("html")).toHaveAttribute("data-docs-style", "lyra")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(
    page.locator("[data-docs-header]").getByRole("switch", { name: "Dark mode" })
  ).toBeChecked()
  expect(errors).toEqual([])
})

test("renders the shared Solid palette and header logo before hydration", async ({ page }) => {
  // Keep the inline appearance script and stylesheet, but prevent island hydration.
  await page.route("**/*", (route) =>
    route.request().resourceType() === "script" ? route.abort() : route.continue()
  )
  const palettes = [
    {
      mode: "light",
      background: "rgb(248, 251, 255)",
      primary: "rgb(10, 69, 147)",
      secondary: "rgb(233, 241, 251)"
    },
    {
      mode: "dark",
      background: "rgb(13, 22, 35)",
      primary: "rgb(101, 197, 255)",
      secondary: "rgb(32, 52, 77)"
    }
  ] as const
  const header = page.locator("[data-docs-header]")
  const logo = page.getByRole("link", { name: "Solid UI documentation" }).locator("img")
  const primaryButton = page
    .locator('[data-slot="preview"] [data-slot="button"][data-variant="default"]')
    .first()
  const secondaryButton = page
    .locator('[data-slot="preview"] [data-slot="button"][data-variant="secondary"]')
    .first()
  for (const { mode, background, primary, secondary } of palettes) {
    await page.emulateMedia({ colorScheme: mode })
    await page.goto("/docs/components/button/", { waitUntil: "domcontentloaded" })
    await expect(page.locator("html")).toHaveAttribute("data-color-mode", mode)
    await expect(header.locator("astro-island[ssr]")).not.toHaveCount(0)
    await expect(page.locator("body")).toHaveCSS("background-color", background)
    await expect(primaryButton).toHaveCSS("background-color", primary)
    await expect(secondaryButton).toHaveCSS("background-color", secondary)
  }
  await expect(logo).toBeVisible()
  expect(await logo.getAttribute("src")).toBe(
    await page.locator('link[rel="icon"]').getAttribute("href")
  )
})

test("opens mobile navigation without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/docs/components/button/")
  await expect(page.locator("[data-docs-header] astro-island[ssr]")).toHaveCount(0)
  await page.getByRole("button", { name: "Open navigation" }).click()
  const navigation = page.getByRole("navigation", { name: "Mobile documentation" })
  await expect(navigation).toBeVisible()
  await navigation.getByRole("link", { name: "Switch", exact: true }).click()
  await expect(page).toHaveURL(/\/docs\/components\/switch\/?$/)
  await expect(page.getByRole("heading", { name: "Switch", level: 1 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test("keeps switch thumbs centered and inside every track, in both directions", async ({
  page
}) => {
  test.setTimeout(120_000)
  await page.goto("/docs/components/switch/")
  for (const island of await page.locator("astro-island").all()) {
    await island.evaluate((node) => node.parentElement?.scrollIntoView({ block: "center" }))
    await expect(island).not.toHaveAttribute("ssr", "")
  }
  const article = page.locator('article[data-slot="docs"]')
  for (const style of styles) {
    await page
      .locator("[data-docs-header]")
      .getByRole("combobox", { name: "Preview style" })
      .click()
    await page.getByRole("option", { name: new RegExp(`^${style}$`, "i") }).click()
    for (const direction of ["ltr", "rtl"]) {
      await article.evaluate((node, direction) => {
        node.dir = direction
        node.querySelectorAll<HTMLElement>("[dir]").forEach((child) => {
          child.dir = direction
        })
      }, direction)
      for (const size of ["default", "sm"]) {
        const control = article
          .locator(`[data-slot="switch"][data-size="${size}"]:not([disabled])`)
          .first()
        for (const checked of [false, true]) {
          if ((await control.isChecked()) !== checked) await control.click()
          await expect
            .poll(() =>
              control.evaluate(
                (node, { checked, direction, square }) => {
                  const thumb = node.querySelector<HTMLElement>('[data-slot="switch-thumb"]')!
                  const trackBox = node.getBoundingClientRect(),
                    thumbBox = thumb.getBoundingClientRect()
                  const css = getComputedStyle(node)
                  const atRight = checked === (direction === "ltr")
                  const edge = atRight
                    ? trackBox.right - Number.parseFloat(css.borderRightWidth) - thumbBox.right
                    : thumbBox.left - trackBox.left - Number.parseFloat(css.borderLeftWidth)
                  const centered =
                    Math.abs(
                      trackBox.top + trackBox.height / 2 - (thumbBox.top + thumbBox.height / 2)
                    ) < 0.6
                  const corners =
                    !square ||
                    (Number.parseFloat(css.borderTopLeftRadius) === 0 &&
                      Number.parseFloat(getComputedStyle(thumb).borderTopLeftRadius) === 0)
                  return centered && Math.abs(edge - (square ? 1 : 0)) < 0.8 && corners
                },
                { checked, direction, square: style === "sera" }
              )
            )
            .toBe(true)
        }
      }
    }
  }
})
