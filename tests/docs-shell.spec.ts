import { expect, test } from "@playwright/test"

import { styles } from "../apps/docs/src/lib/appearance"

test("links the home page, docs, component catalog and project from the shared shell", async ({
  page
}) => {
  await page.goto("/?prototype=1")
  const header = page.locator("[data-docs-header]")
  const navigation = header.getByRole("navigation", { name: "Main navigation" })
  await expect(
    page.getByRole("heading", { name: "The Foundation for your Design System", level: 1 })
  ).toBeVisible()
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page"
  )
  await expect(page.getByText("Built for Solid 2.0", { exact: true })).toBeVisible()
  await expect(
    page.getByText(
      "Bring the shadcn/ui approach to Solid. Build your own component library with code you can customize, extend, and make your own. Powered by UI SDK.",
      { exact: true }
    )
  ).toBeVisible()
  await expect(page.getByRole("navigation", { name: "Hero prototypes" })).toHaveCount(0)
  await expect(header.getByRole("link", { name: "Solid UI on GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/stefan-karger/solid-ui"
  )
  const footer = page.getByRole("contentinfo")
  await expect(footer).toHaveText(
    "Built by shadcn. Ported to Solid by Stefan Karger. The source code is available on GitHub."
  )
  await expect(footer.getByRole("link", { name: "shadcn", exact: true })).toHaveAttribute(
    "href",
    "https://x.com/shadcn"
  )
  await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/stefan-karger/solid-ui"
  )
  await expect(footer.getByRole("link", { name: "Stefan Karger" })).toHaveAttribute(
    "href",
    "https://x.com/karger_stefan"
  )
  const examples = page.getByRole("region", { name: "Component examples" })
  await expect(examples.getByText("Contribution History", { exact: true })).toBeVisible()
  await expect(examples.getByText("Scan to connect your mobile device")).toBeVisible()
  const showNotifications = examples.getByRole("switch", { name: "Enable compact notifications" })
  await showNotifications.scrollIntoViewIfNeeded()
  await expect(showNotifications.locator("xpath=ancestor::astro-island")).not.toHaveAttribute(
    "ssr",
    ""
  )
  await expect(showNotifications).toBeChecked()
  await showNotifications.uncheck()
  await expect(showNotifications).not.toBeChecked()
  const select = header.getByRole("combobox", { name: "Preview style" })
  const mode = header.getByRole("button", { name: "Toggle theme" })
  await expect(select.locator("xpath=ancestor::astro-island")).not.toHaveAttribute("ssr", "")
  expect((await mode.boundingBox())!.x).toBeGreaterThan((await select.boundingBox())!.x)
  await expect(examples.locator('[data-slot="card"]').first()).toHaveCSS("border-radius", "24px")
  await select.click()
  const popup = page.locator('[data-slot="select-content"][data-open]')
  await expect(popup.locator('[data-slot="select-list"]')).toHaveCSS("padding", "4px")
  await expect(popup).toHaveCSS("box-shadow", /rgb\(223, 228, 236\)/)
  await page.getByRole("option", { name: /^sera$/i }).click()
  await expect(page.locator("html")).toHaveClass(/style-sera/)
  await expect(examples.locator('[data-slot="card"]').first()).toHaveCSS("border-radius", "0px")
  await page.getByRole("link", { name: "View Components" }).click()
  await expect(page.getByRole("heading", { name: "Components", exact: true })).toBeVisible()
  await expect(footer).toHaveCount(0)
  await expect(
    page.getByRole("article").getByRole("link", { name: "Button", exact: true })
  ).toHaveCSS("border-top-width", "0px")
  await navigation.getByRole("link", { name: "Docs", exact: true }).click()
  await expect(page.getByRole("heading", { name: "Introduction", level: 1 })).toBeVisible()
  const introduction = page.getByRole("article", { name: "Introduction" })
  await expect(
    introduction
      .getByRole("navigation", { name: "Page navigation", exact: true })
      .getByRole("link", { name: "Next page, Components" })
  ).toHaveAttribute("href", "/docs/components/")
  await expect(introduction.locator("[data-docs-accordion]")).toHaveAttribute(
    "data-accordion-enhanced",
    "true"
  )
  const updates = introduction.getByRole("button", { name: "How do upstream updates work?" })
  await updates.click()
  await expect(updates).toHaveAttribute("aria-expanded", "true")
  await navigation.getByRole("link", { name: "Home" }).click()
  await expect(page).toHaveURL("/")
})

test("copies docs Markdown and offers the page actions and pagination", async ({
  context,
  page,
  request
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/docs/components/button/")
  const article = page.getByRole("article")
  const actions = article.locator("[data-docs-copy-page]")
  const copy = actions.getByRole("button", { name: "Copy Page", exact: true })
  await expect(copy.locator("xpath=ancestor::astro-island")).not.toHaveAttribute("ssr", "")
  await copy.click()
  await expect(actions.getByRole("status")).toHaveText("Page copied")
  const markdown = await page.evaluate(() => navigator.clipboard.readText())
  expect(markdown).toContain('title: "Button"')
  expect(markdown).toContain("## Installation")

  await article.getByRole("button", { name: "Copy Page options" }).press("Enter")
  const menu = page.getByRole("menu", { name: "Copy Page options" })
  await expect(menu.getByRole("menuitem")).toHaveCount(4)
  await expect(
    menu.getByRole("menuitem", { name: "Open in Scira" }).locator("svg")
  ).toHaveAttribute("fill", "none")
  const view = menu.getByRole("menuitem", { name: "View as Markdown" })
  await expect(view).toHaveAttribute("target", "_blank")
  const markdownPath = await view.getAttribute("href")
  expect(markdownPath).toBe("/docs/components/button.md")
  const response = await request.get(markdownPath!)
  expect(response.ok()).toBe(true)
  const renderedMarkdown = await response.text()
  expect(renderedMarkdown).toContain('title: "Button"')
  expect(renderedMarkdown).toContain("```tsx")
  expect(renderedMarkdown).not.toContain("<ComponentPreview")

  for (const [name, service] of [
    ["Open in ChatGPT", "https://chatgpt.com/"],
    ["Open in Claude", "https://claude.ai/new"],
    ["Open in Scira", "https://scira.ai/"]
  ]) {
    const item = menu.getByRole("menuitem", { name })
    await expect(item).toHaveAttribute("target", "_blank")
    const href = new URL((await item.getAttribute("href"))!)
    expect(href.origin + href.pathname).toBe(service)
    expect(href.searchParams.get("q")).toContain(
      new URL("/docs/components/button", page.url()).href
    )
  }
  await page.keyboard.press("Escape")

  const top = article.getByRole("navigation", { name: "Page navigation", exact: true })
  const bottom = article.getByRole("navigation", { name: "More documentation", exact: true })
  await expect(bottom).toHaveCSS("border-top-width", "0px")
  for (const direction of [/^Previous page,/, /^Next page,/]) {
    await expect(bottom.getByRole("link", { name: direction })).toHaveAttribute(
      "href",
      (await top.getByRole("link", { name: direction }).getAttribute("href"))!
    )
  }
})

test("applies the shared Solid palette to the live mobile showcase", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 })
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto("/")
  const examples = page.getByRole("region", { name: "Component examples" })
  const showcase = examples.locator('[data-slot="showcase"]')
  const button = showcase.getByRole("button", { name: "Button", exact: true })
  const card = showcase.locator('[data-slot="card"]').first()
  await expect(button).toHaveCSS("background-color", "rgb(10, 69, 147)")
  await expect(card).toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(showcase).toHaveCSS("background-color", "rgb(245, 247, 250)")
  const theme = page.getByRole("button", { name: "Toggle theme" })
  await expect(theme.locator("xpath=ancestor::astro-island")).not.toHaveAttribute("ssr", "")
  await theme.click()
  await expect(button).toHaveCSS("background-color", "rgb(10, 160, 239)")
  await expect(card).toHaveCSS("background-color", "rgb(23, 40, 61)")
  await expect(showcase).toHaveCSS("background-color", "rgb(3, 21, 44)")
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test("spaces the desktop header dividers from the visible GitHub content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/docs/")
  const header = page.locator("[data-docs-header]")
  const github = header.getByRole("link", { name: /^Solid UI on GitHub/ })
  const metrics = await github.evaluate((link) => {
    const firstDivider = link.previousElementSibling!.getBoundingClientRect()
    const lastDivider = link.nextElementSibling!.getBoundingClientRect()
    const icon = link.querySelector("svg path")!.getBoundingClientRect()
    const count = link.querySelector("[data-github-stars]")?.getBoundingClientRect()
    return {
      iconWidth: icon.width,
      dividerToIcon: icon.left - firstDivider.right,
      contentToDivider: lastDivider.left - (count ?? icon).right
    }
  })
  expect(metrics.iconWidth).toBeCloseTo(16, 1)
  expect(metrics.dividerToIcon).toBeCloseTo(18, 1)
  expect(metrics.contentToDivider).toBeCloseTo(18, 1)

  const firstDivider = github.locator("xpath=preceding-sibling::*[1]")
  const lastDivider = github.locator("xpath=following-sibling::*[1]")
  const search = header.getByRole("button", { name: "Search documentation" })
  const select = header.getByRole("combobox", { name: "Preview style" })
  const searchBox = (await search.boundingBox())!
  const lastDividerBox = (await lastDivider.boundingBox())!
  expect((await firstDivider.boundingBox())!.x - (searchBox.x + searchBox.width)).toBe(16)
  expect((await select.boundingBox())!.x - (lastDividerBox.x + lastDividerBox.width)).toBe(16)
})

test("searches sidebar links and navigates from the command palette by keyboard", async ({
  page
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/docs/components/button/")
  const trigger = page.getByRole("button", { name: "Search documentation" })
  await expect(trigger.getByText("Search documentation...", { exact: true })).toBeVisible()
  await expect(trigger.locator("svg, kbd")).toHaveCount(0)
  const searchIsland = trigger.locator("xpath=ancestor::astro-island")
  await expect(searchIsland).not.toHaveAttribute("ssr", "")
  const sidebarLinks = await page
    .getByRole("navigation", { name: "Documentation", exact: true })
    .getByRole("link")
    .allTextContents()
  await page.keyboard.press("ControlOrMeta+k")
  const dialog = page.getByRole("dialog", { name: "Search documentation" })
  const search = dialog.getByRole("combobox", { name: "Find a section or component" })
  await expect(search).toBeFocused()
  await expect(dialog).toHaveCSS("box-shadow", /0px 0px 0px 4px/)
  await expect(dialog.locator('[data-slot="command-empty"]')).toBeHidden()
  const footer = dialog.locator('[data-slot="dialog-footer"]')
  await expect(footer.getByText("Go to Page", { exact: true })).toBeVisible()
  await expect(footer.locator("kbd")).toHaveText("Enter")
  expect((await dialog.getByRole("option").allTextContents()).map((text) => text.trim())).toEqual(
    sidebarLinks.map((text) => text.trim())
  )
  await search.fill("no-such-component")
  await expect(dialog.getByText("No results found.")).toBeVisible()
  await expect(footer).toBeVisible()
  await search.fill("calendar")
  await expect(dialog.getByRole("option", { name: "Calendar" })).toBeVisible()
  await search.press("Enter")
  await expect(page.getByRole("heading", { name: "Calendar", level: 1 })).toBeVisible()
  await expect(searchIsland).not.toHaveAttribute("ssr", "")
  await trigger.click()
  await expect(search).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

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
  await expect(sidebar.getByRole("link", { name: "Switch", exact: true })).toBeInViewport()
  const toc = page
    .getByRole("navigation", { name: "On this page", exact: true })
    .filter({ visible: true })
  const usage = toc.getByRole("link", { name: "Usage", exact: true })
  await expect(toc.getByText("On This Page", { exact: true })).toHaveCSS("font-size", "12px")
  await expect(usage).toHaveCSS("font-size", "12.8px")
  await usage.click()
  await expect(page).toHaveURL(/#usage$/)
  await expect(usage).toHaveAttribute("aria-current", "location")
  await expect(usage).toHaveCSS("font-weight", "500")
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
  await header.getByRole("button", { name: "Toggle theme" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  const source = page.locator('[data-registry-path="ui/switch.tsx"]')
  await expect(source).toHaveAttribute("data-source-style", "lyra", { timeout: 30_000 })
  const code = await source.locator("[data-copy-button]").getAttribute("data-copy-value")
  expect(code).toContain("rounded-full")
  await page.goto("/docs/components/button/")
  await expect(page.locator("html")).toHaveAttribute("data-docs-style", "lyra")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(
    page.locator("[data-docs-header]").getByRole("button", { name: "Toggle theme" })
  ).toHaveAttribute("aria-pressed", "true")
  expect(errors).toEqual([])
})

test("renders the shared Solid palette and Home link before hydration", async ({ page }) => {
  // Keep the inline appearance script and stylesheet, but prevent island hydration.
  await page.route("**/*", (route) =>
    route.request().resourceType() === "script" ? route.abort() : route.continue()
  )
  const palettes = [
    {
      mode: "light",
      background: "rgb(255, 255, 255)",
      foreground: "rgb(3, 21, 44)",
      primary: "rgb(10, 69, 147)",
      primaryForeground: "rgb(255, 255, 255)",
      secondary: "rgb(238, 242, 247)"
    },
    {
      mode: "dark",
      background: "rgb(3, 21, 44)",
      foreground: "rgb(255, 255, 255)",
      primary: "rgb(10, 160, 239)",
      primaryForeground: "rgb(3, 21, 44)",
      secondary: "rgb(41, 56, 76)"
    }
  ] as const
  const header = page.locator("[data-docs-header]")
  const home = header.getByRole("link", { name: "Home", exact: true })
  const primaryButton = page
    .locator('[data-slot="preview"] [data-slot="button"][data-variant="default"]')
    .first()
  const secondaryButton = page
    .locator('[data-slot="preview"] [data-slot="button"][data-variant="secondary"]')
    .first()
  for (const { mode, background, foreground, primary, primaryForeground, secondary } of palettes) {
    await page.emulateMedia({ colorScheme: mode })
    await page.goto("/docs/components/button/", { waitUntil: "domcontentloaded" })
    await expect(page.locator("html")).toHaveAttribute("data-color-mode", mode)
    await expect(header.locator("astro-island[ssr]")).not.toHaveCount(0)
    await expect(page.locator("body")).toHaveCSS("background-color", background)
    await expect(page.locator("body")).toHaveCSS("color", foreground)
    await expect(primaryButton).toHaveCSS("background-color", primary)
    await expect(primaryButton).toHaveCSS("color", primaryForeground)
    await expect(secondaryButton).toHaveCSS("background-color", secondary)
  }
  await expect(home).toBeVisible()
  await expect(home).toHaveAttribute("href", "/")
})

test("opens mobile navigation without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/docs/components/button/")
  await expect(page.locator("[data-docs-header] astro-island[ssr]")).toHaveCount(0)
  await expect(
    page.getByRole("navigation", { name: "Main navigation", includeHidden: true })
  ).toBeHidden()
  await expect(
    page
      .getByRole("button", { name: "Search documentation" })
      .getByText("Search...", { exact: true })
  ).toBeVisible()
  await page.getByRole("button", { name: "Toggle menu" }).click()
  const navigation = page.getByRole("navigation", { name: "Mobile documentation" })
  await expect(navigation).toBeVisible()
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
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
