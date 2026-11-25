import { readFile } from "node:fs/promises"

import { expect, test } from "@playwright/test"

import { styles } from "../apps/docs/src/lib/appearance"
import {
  registryItemSchema,
  registryIndexSchema,
  registrySchema,
  stylesSchema
} from "../packages/registry/src/schema"
import { supportedRange } from "../packages/registry/src/versions"

test("publishes the v2 registry and the static v1 CLI registry in the production build @smoke", async ({
  request
}) => {
  async function json(path: string): Promise<unknown> {
    const response = await request.get(path)
    expect(response.ok()).toBe(true)
    expect(response.headers()["content-type"]).toContain("application/json")
    const body = await response.text()
    expect(body).toBe(await readFile(`apps/docs/public${path}`, "utf8"))
    return JSON.parse(body)
  }

  const index = registryIndexSchema.parse(await json("/r/index.json"))
  const names = new Set(index.map(({ name }) => name))
  expect(names.has("toast")).toBe(true)
  expect(names.has("sonner")).toBe(false)
  for (const item of index) {
    expect(item.type).not.toBe("registry:example")
    for (const dependency of item.registryDependencies ?? []) {
      expect(names.has(dependency)).toBe(true)
    }
  }

  const nova = registryItemSchema.parse(
    await json("/r/styles/nova/button.json")
  )
  const vega = registryItemSchema.parse(
    await json("/r/styles/vega/button.json")
  )
  expect(nova.files?.[0]?.content).not.toBe(vega.files?.[0]?.content)
  // Projects bring Solid; other packages use the ranges the docs are tested with.
  expect(nova.dependencies).toEqual(["class-variance-authority@^0.7.1"])
  expect(nova.registryDependencies).toContain("utils")
  expect(nova.files?.[0]?.content).not.toContain("cn-button")
  expect(nova.$schema).toBe("https://ui.shadcn.com/schema/registry-item.json")

  // The CLI resolves the menu markers from the project's menu color.
  const menu = registryItemSchema.parse(
    await json("/r/styles/nova/dropdown-menu.json")
  )
  expect(menu.files?.[0]?.content).toContain(
    "cn-menu-target cn-menu-translucent"
  )
  expect(menu.dependencies).toContain(
    `@ui-sdk/solid@${supportedRange("@ui-sdk/solid")}`
  )

  expect(await json("/schema.json")).toMatchObject({
    type: "object",
    required: ["style", "preset", "tailwind"]
  })

  expect(stylesSchema.parse(await json("/r/styles/index.json"))).toEqual(
    styles.map((name) =>
      expect.objectContaining({ name, label: expect.any(String) })
    )
  )
  for (const style of styles) {
    const catalog = registrySchema.parse(
      await json(`/r/styles/${style}/registry.json`)
    )
    expect(catalog.items.some(({ name }) => name === "button")).toBe(true)
    expect(
      catalog.items.flatMap(({ files }) => files ?? [])
    ).not.toContainEqual(
      expect.objectContaining({ content: expect.anything() })
    )
  }
  const example = registryItemSchema.parse(
    await json("/r/styles/lyra/item-example.json")
  )
  expect(example.type).toBe("registry:example")
  expect(example.registryDependencies).toEqual(["button", "example", "item"])
  expect(example.files?.[0]?.content).toContain('from "~/components/example"')

  for (const path of [
    "/r/button.json",
    "/r/nova/button.json",
    "/r/registry.json",
    "/registry-source/nova/ui/button.tsx.json"
  ]) {
    expect((await request.get(path)).status()).toBe(404)
  }

  const styleUtilities = registryItemSchema.parse(
    await json("/r/styles/nova/style-utilities.json")
  )
  expect(styleUtilities.files?.[0]).toMatchObject({
    target: "styles/solid-ui.css",
    content: expect.stringContaining("@utility shimmer")
  })

  // solidui-cli 0.7 keeps receiving the static v1 registry.
  expect(await json("/registry/index.json")).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "button", type: "ui" })
    ])
  )
  expect(await json("/registry/ui/button.json")).toMatchObject({
    name: "button",
    files: [{ content: expect.stringContaining("@kobalte/core") }]
  })
})

test("links the home page, docs, component catalog and project from the shared shell @smoke", async ({
  page
}) => {
  await page.goto("/?prototype=1")
  const header = page.locator("[data-docs-header]")
  const navigation = header.getByRole("navigation", { name: "Main navigation" })
  await expect(
    page.getByRole("heading", {
      name: "The Foundation for your Design System",
      level: 1
    })
  ).toBeVisible()
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page"
  )
  await expect(
    page.getByText("Built for Solid 2.0", { exact: true })
  ).toBeVisible()
  await expect(
    page.getByText(
      "Bring the shadcn/ui approach to Solid. Build your own component library with code you can customize, extend, and make your own. Powered by UI SDK.",
      { exact: true }
    )
  ).toBeVisible()
  await expect(
    page.getByRole("navigation", { name: "Hero prototypes" })
  ).toHaveCount(0)
  await expect(
    header.getByRole("link", { name: "Solid UI on GitHub" })
  ).toHaveAttribute("href", "https://github.com/stefan-karger/solid-ui")
  const footer = page.getByRole("contentinfo")
  await expect(footer).toHaveText(
    "Built by shadcn. Ported to Solid by Stefan Karger. The source code is available on GitHub."
  )
  await expect(
    footer.getByRole("link", { name: "shadcn", exact: true })
  ).toHaveAttribute("href", "https://x.com/shadcn")
  await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/stefan-karger/solid-ui"
  )
  await expect(
    footer.getByRole("link", { name: "Stefan Karger" })
  ).toHaveAttribute("href", "https://x.com/karger_stefan")
  const examples = page.getByRole("region", { name: "Component examples" })
  await expect(
    examples.getByText("Contribution History", { exact: true })
  ).toBeVisible()
  await expect(
    examples.getByText("Scan to connect your mobile device")
  ).toBeVisible()
  const showNotifications = examples.getByRole("switch", {
    name: "Enable compact notifications"
  })
  await showNotifications.scrollIntoViewIfNeeded()
  await expect(
    showNotifications.locator("xpath=ancestor::astro-island")
  ).not.toHaveAttribute("ssr", "")
  await expect(showNotifications).toBeChecked()
  await showNotifications.uncheck()
  await expect(showNotifications).not.toBeChecked()
  const select = header.getByRole("combobox", { name: "Preview style" })
  const mode = header.getByRole("button", { name: "Toggle theme" })
  await expect(
    select.locator("xpath=ancestor::astro-island")
  ).not.toHaveAttribute("ssr", "")
  expect((await mode.boundingBox())!.x).toBeGreaterThan(
    (await select.boundingBox())!.x
  )
  await expect(examples.locator('[data-slot="card"]').first()).toHaveCSS(
    "border-radius",
    "24px"
  )
  await select.click()
  const popup = page.locator('[data-slot="select-content"][data-open]')
  await expect(popup.locator('[data-slot="select-list"]')).toHaveCSS(
    "padding",
    "4px"
  )
  await expect(popup).toHaveCSS("box-shadow", /rgb\(223, 228, 236\)/)
  await page.getByRole("option", { name: /^sera$/i }).click()
  await expect(page.locator("html")).toHaveClass(/style-sera/)
  await expect(examples.locator('[data-slot="card"]').first()).toHaveCSS(
    "border-radius",
    "0px"
  )
  await page.getByRole("link", { name: "View Components" }).click()
  await expect(
    page.getByRole("heading", { name: "Components", exact: true })
  ).toBeVisible()
  await expect(footer).toHaveCount(0)
  await expect(
    page.getByRole("article").getByRole("link", { name: "Button", exact: true })
  ).toHaveCSS("border-top-width", "0px")
  await navigation.getByRole("link", { name: "Docs", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Introduction", level: 1 })
  ).toBeVisible()
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
  const updates = introduction.getByRole("button", {
    name: "How do upstream updates work?"
  })
  await updates.click()
  await expect(updates).toHaveAttribute("aria-expanded", "true")
  await navigation.getByRole("link", { name: "Home" }).click()
  await expect(page).toHaveURL("/")
})

test("lists AI patterns with working Solid UI examples in the docs", async ({
  page,
  request
}) => {
  await page.goto("/docs/components/trace/")
  await page
    .getByRole("article")
    .getByRole("link", { name: "AI Elements" })
    .click()
  await expect(page).toHaveURL(/\/docs\/ai-elements\/?$/)
  const article = page.getByRole("article", { name: "AI Elements" })
  await expect(article.getByRole("heading", { name: "Patterns" })).toBeVisible()
  await expect(
    page
      .getByRole("navigation", { name: "Documentation", exact: true })
      .getByRole("link", { name: "AI Elements" })
  ).toHaveAttribute("aria-current", "page")
  await expect(
    article
      .getByRole("navigation", { name: "Page navigation", exact: true })
      .getByRole("link", { name: "Previous page, Components" })
  ).toHaveAttribute("href", "/docs/components/")

  const grid = article.locator('[data-slot="ai-pattern-grid"]')
  const table = article.getByRole("table").first()
  await expect(table.locator("..")).toHaveCSS("border-top-width", "0px")
  await expect(table.getByRole("row").first()).toHaveCSS(
    "border-bottom-width",
    "1px"
  )
  const links = await grid
    .getByRole("link")
    .evaluateAll((cards) =>
      cards.map((card) => (card as HTMLAnchorElement).href)
    )
  expect(links).toHaveLength(21)
  await Promise.all(
    links.map(async (link) => {
      const { pathname } = new URL(link)
      expect(pathname).toMatch(/^\/docs\/ai-elements\/[^/]+\/$/)
      const response = await request.get(pathname)
      expect(response.ok(), pathname).toBe(true)
      expect(await response.text(), link).toContain(
        'data-slot="component-preview"'
      )
    })
  )

  const markdown = await request.get("/docs/ai-elements.md")
  expect(markdown.ok()).toBe(true)
  expect(await markdown.text()).toContain(
    "- [Chain of Thought](/docs/ai-elements/chain-of-thought/)"
  )
})

test("streams the confirmation example through a tool decision", async ({
  page
}) => {
  await page.goto("/docs/ai-elements/confirmation/")
  const preview = page
    .locator('[data-slot="component-preview"] astro-island')
    .first()
  await preview.scrollIntoViewIfNeeded()
  await expect(preview).not.toHaveAttribute("ssr", "")
  await preview.getByRole("button", { name: "Send message" }).click()
  await preview.getByRole("button", { name: "Deny", exact: true }).click()
  await expect(
    preview.getByText("Okay, I left the dist folder in place.")
  ).toBeVisible()
  await expect(preview.getByText(/^Denied rm/)).toBeVisible()
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
  await expect(
    copy.locator("xpath=ancestor::astro-island")
  ).not.toHaveAttribute("ssr", "")
  await copy.click()
  await expect(actions.getByRole("status")).toHaveText("Page copied")
  const markdown = await page.evaluate(() => navigator.clipboard.readText())
  expect(markdown).toContain('title: "Button"')
  expect(markdown).toContain("## Installation")

  await article
    .getByRole("button", { name: "Copy Page options" })
    .press("Enter")
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

  const top = article.getByRole("navigation", {
    name: "Page navigation",
    exact: true
  })
  const bottom = article.getByRole("navigation", {
    name: "More documentation",
    exact: true
  })
  await expect(bottom).toHaveCSS("border-top-width", "0px")
  for (const direction of [/^Previous page,/, /^Next page,/]) {
    await expect(bottom.getByRole("link", { name: direction })).toHaveAttribute(
      "href",
      (await top.getByRole("link", { name: direction }).getAttribute("href"))!
    )
  }
})

test("searches sidebar links and navigates from the command palette by keyboard", async ({
  page
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/docs/components/button/")
  const trigger = page.getByRole("button", { name: "Search documentation" })
  await expect(
    trigger.getByText("Search documentation...", { exact: true })
  ).toBeVisible()
  await expect(trigger.locator("svg, kbd")).toHaveCount(0)
  const searchIsland = trigger.locator("xpath=ancestor::astro-island")
  await expect(searchIsland).not.toHaveAttribute("ssr", "")
  const sidebarLinks = await page
    .getByRole("navigation", { name: "Documentation", exact: true })
    .getByRole("link")
    .allTextContents()
  await page.keyboard.press("ControlOrMeta+k")
  const dialog = page.getByRole("dialog", { name: "Search documentation" })
  const search = dialog.getByRole("combobox", {
    name: "Find a section or component"
  })
  await expect(search).toBeFocused()
  await expect(dialog).toHaveCSS("box-shadow", /0px 0px 0px 4px/)
  await expect(dialog.locator('[data-slot="command-empty"]')).toBeHidden()
  const footer = dialog.locator('[data-slot="dialog-footer"]')
  await expect(footer.getByText("Go to Page", { exact: true })).toBeVisible()
  await expect(footer.locator("kbd")).toHaveText("Enter")
  expect(
    (await dialog.getByRole("option").allTextContents()).map((text) =>
      text.trim()
    )
  ).toEqual(sidebarLinks.map((text) => text.trim()))
  await search.fill("no-such-component")
  await expect(dialog.getByText("No results found.")).toBeVisible()
  await expect(footer).toBeVisible()
  await search.fill("calendar")
  await expect(dialog.getByRole("option", { name: "Calendar" })).toBeVisible()
  await search.press("Enter")
  await expect(
    page.getByRole("heading", { name: "Calendar", level: 1 })
  ).toBeVisible()
  await expect(searchIsland).not.toHaveAttribute("ssr", "")
  await trigger.click()
  await expect(search).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

test("bootstraps hydration before serialized lazy island data @smoke", async ({
  request
}) => {
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

test("navigates docs with an active sidebar and working page contents", async ({
  page
}) => {
  await page.goto("/docs/components/switch/")
  const sidebar = page.getByRole("navigation", {
    name: "Documentation",
    exact: true
  })
  await expect(
    sidebar.getByRole("link", { name: "Switch", exact: true })
  ).toHaveAttribute("aria-current", "page")
  await expect(
    sidebar.getByRole("link", { name: "Switch", exact: true })
  ).toBeInViewport()
  const toc = page
    .getByRole("navigation", { name: "On this page", exact: true })
    .filter({ visible: true })
  const usage = toc.getByRole("link", { name: "Usage", exact: true })
  await expect(toc.getByText("On This Page", { exact: true })).toHaveCSS(
    "font-size",
    "12px"
  )
  await expect(usage).toHaveCSS("font-size", "12.8px")
  await usage.click()
  await expect(page).toHaveURL(/#usage$/)
  await expect(usage).toHaveAttribute("aria-current", "location")
  await expect(usage).toHaveCSS("font-weight", "500")
  expect(
    await page
      .locator("[data-docs-header]")
      .evaluate((node) => node.getBoundingClientRect().top)
  ).toBe(0)
  await sidebar.getByRole("link", { name: "Button", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 })
  ).toBeVisible()
})

test("shows the component command and manual dependency in installation tabs", async ({
  page
}) => {
  await page.goto("/docs/components/attachment/")
  const installation = page.locator("article [data-slot='code-tabs']")
  const command = installation.getByRole("tab", {
    name: "Command",
    exact: true
  })
  const manual = installation.getByRole("tab", { name: "Manual", exact: true })
  const source = installation.locator(
    '[data-registry-path="ui/attachment.tsx"]'
  )
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

test("expands the full installation source and keeps the example preview capped", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.goto("/docs/components/accordion/")
  await page.getByRole("tab", { name: "Manual", exact: true }).click()
  const source = page.locator('[data-code-collapsible][data-variant="source"]')
  const content = source.locator("[data-code-content]")
  const code = content.locator("pre")
  const toggle = source.locator("[data-code-top-control] button")
  await expect(content).toHaveCSS("max-height", "256px")

  await toggle.press("Enter")
  await expect(toggle).toHaveAttribute("aria-expanded", "true")
  await expect(content).toHaveCSS("max-height", "none")
  const { clientHeight, scrollHeight } = await code.evaluate((element) => ({
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight
  }))
  expect(clientHeight).toBeGreaterThan(384)
  expect(clientHeight).toBe(scrollHeight)
  await expect(code).toHaveCSS("overflow-x", "auto")

  await toggle.press("Enter")
  await expect(toggle).toHaveAttribute("aria-expanded", "false")
  await expect(content).toHaveCSS("max-height", "256px")

  const preview = page
    .locator('[data-code-collapsible][data-variant="preview"]')
    .first()
  const viewCode = preview.getByRole("button", {
    name: "View Code",
    exact: true
  })
  await viewCode.press("Enter")
  await expect(preview.locator("pre")).toHaveCSS("max-height", "288px")
  // Keyboard focus follows the one visible control.
  const collapse = preview.getByRole("button", { name: "Collapse" })
  await expect(viewCode).toBeHidden()
  await expect(collapse).toBeVisible()
  await expect(collapse).toBeFocused()
  await collapse.press("Enter")
  await expect(collapse).toBeHidden()
  await expect(viewCode).toBeFocused()
})

test("persists style and color mode and offers matching registry source @smoke", async ({
  page
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/docs/components/switch/")
  const header = page.locator("[data-docs-header]")
  await expect(header.locator("astro-island[ssr]")).toHaveCount(0, {
    timeout: 30_000
  })
  await header.getByRole("combobox", { name: "Preview style" }).click()
  await page.getByRole("option", { name: /^lyra$/i }).click()
  await expect(page.locator("html")).toHaveAttribute("data-docs-style", "lyra")
  await header.getByRole("button", { name: "Toggle theme" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  const source = page.locator('[data-registry-path="ui/switch.tsx"]')
  await expect(source).toHaveAttribute("data-source-style", "lyra", {
    timeout: 30_000
  })
  const code = await source
    .locator("[data-copy-button]")
    .getAttribute("data-copy-value")
  expect(code).toContain("rounded-full")
  await page.goto("/docs/components/button/")
  await expect(page.locator("html")).toHaveAttribute("data-docs-style", "lyra")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(
    page
      .locator("[data-docs-header]")
      .getByRole("button", { name: "Toggle theme" })
  ).toHaveAttribute("aria-pressed", "true")
  expect(errors).toEqual([])
})

test("renders the shared Solid palette and Home link before hydration", async ({
  page
}) => {
  // Keep the inline appearance script and stylesheet, but prevent island hydration.
  await page.route("**/*", (route) =>
    route.request().resourceType() === "script"
      ? route.abort()
      : route.continue()
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
    .locator(
      '[data-slot="preview"] [data-slot="button"][data-variant="default"]'
    )
    .first()
  const secondaryButton = page
    .locator(
      '[data-slot="preview"] [data-slot="button"][data-variant="secondary"]'
    )
    .first()
  for (const {
    mode,
    background,
    foreground,
    primary,
    primaryForeground,
    secondary
  } of palettes) {
    await page.emulateMedia({ colorScheme: mode })
    await page.goto("/docs/components/button/", {
      waitUntil: "domcontentloaded"
    })
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

test("opens mobile navigation without horizontal overflow", async ({
  page
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/docs/components/button/")
  await expect(
    page.locator("[data-docs-header] astro-island[ssr]")
  ).toHaveCount(0)
  await expect(
    page.getByRole("navigation", {
      name: "Main navigation",
      includeHidden: true
    })
  ).toBeHidden()
  await expect(
    page
      .getByRole("button", { name: "Search documentation" })
      .getByText("Search...", { exact: true })
  ).toBeVisible()
  await page.getByRole("button", { name: "Toggle menu" }).click()
  const navigation = page.getByRole("navigation", {
    name: "Mobile documentation"
  })
  await expect(navigation).toBeVisible()
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/"
  )
  await navigation.getByRole("link", { name: "Switch", exact: true }).click()
  await expect(page).toHaveURL(/\/docs\/components\/switch\/?$/)
  await expect(
    page.getByRole("heading", { name: "Switch", level: 1 })
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true)
})
