import { expect, test } from "@playwright/test"

const preview = "/preview"
const cardCount = 16
const example = `${preview}?preset=b2Whd5Ob2`

test("Create applies coherent colors to the fixed iframe and shuffles with locks", async ({
  page
}) => {
  await page.goto("/create/?preset=b2Whd5Ob2")
  const iframe = page.locator('iframe[title="Preset preview"]')
  const frame = iframe.contentFrame()
  const root = frame.locator("html")
  await expect(root).toHaveClass(/style-sera/)
  await expect(iframe).toHaveAttribute("src", "/preview")
  const notes = frame.getByRole("textbox", { name: "Notes", exact: true })
  await expect(frame.locator("astro-island[ssr]")).toHaveCount(0)
  await notes.fill("Keep this after editing")

  await page.getByRole("button", { name: "Lock Theme", exact: true }).focus()
  await page.keyboard.press("Space")
  await expect(
    page.getByRole("button", { name: "Lock Theme", exact: true })
  ).toHaveAttribute("aria-pressed", "true")
  const baseColor = page.getByRole("button", {
    name: "Base Color",
    exact: true
  })
  const stone = page.getByRole("menuitemradio", { name: "Stone", exact: true })
  const beforePreview = page.url()
  await baseColor.click()
  await stone.hover()
  await expect(root).toHaveCSS("--foreground", "oklch(0.147 0.004 49.25)")
  await expect(page).toHaveURL(beforePreview)
  await page.keyboard.press("Escape")
  await expect(stone).toBeHidden()
  await expect(baseColor).toBeFocused()
  await expect(root).toHaveCSS("--foreground", "oklch(0.148 0.004 228.8)")
  await baseColor.click()
  await stone.click()
  await expect(stone).toHaveAttribute("aria-checked", "true")
  await page.keyboard.press("Escape")
  await expect(stone).toBeHidden()
  await expect(
    page.locator('[data-create-picker="Base Color"] [data-create-value]')
  ).toHaveText("Stone")
  await expect(
    page.locator('[data-create-picker="Theme"] [data-create-value]')
  ).toHaveText("Cyan")
  await expect(
    page.locator('[data-create-picker="Chart Color"] [data-create-value]')
  ).toHaveText("Stone")
  await expect(root).toHaveCSS("--foreground", "oklch(0.147 0.004 49.25)")
  await expect(notes).toHaveValue("Keep this after editing")

  const before = page.url()
  await page.getByRole("button", { name: "Shuffle", exact: true }).click()
  await expect.poll(() => page.url()).not.toBe(before)
  await expect(
    page.locator('[data-create-picker="Theme"] [data-create-value]')
  ).toHaveText("Cyan")
  await expect(notes).toHaveValue("Keep this after editing")
})

test("Create groups fonts, follows the body font and imports a preset", async ({
  page,
  context
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/create/")
  await expect(page.locator("[data-create-ready]")).toBeVisible()
  const frame = page.frameLocator('iframe[title="Preset preview"]')
  const heading = page.locator(
    '[data-create-picker="Heading"] [data-create-value]'
  )
  const font = page.getByRole("button", { name: "Font", exact: true })
  await font.press("Enter")
  const fontMenu = page.getByRole("menu")
  await expect(fontMenu.getByRole("group").getByRole("group")).toHaveText([
    /^Sans/,
    /^Mono/,
    /^Serif/
  ])
  await fontMenu
    .getByRole("menuitemradio", { name: "Manrope", exact: true })
    .click()
  await page.keyboard.press("Escape")
  await expect(font).toBeFocused()
  await expect(heading).toHaveText("Manrope")
  await expect(frame.locator("body")).toHaveCSS(
    "font-family",
    /Manrope Variable/
  )

  await page.getByRole("button", { name: "Lock Heading", exact: true }).focus()
  await page.keyboard.press("Space")
  await font.click()
  await page.getByRole("menuitemradio", { name: "Roboto", exact: true }).click()
  await page.keyboard.press("Escape")
  await expect(heading).toHaveText("Manrope")
  await expect(frame.locator("body")).toHaveCSS(
    "font-family",
    /Roboto Variable/
  )
  await expect(frame.locator("[data-slot='card-title']").first()).toHaveCSS(
    "font-family",
    /Manrope Variable/
  )

  await page.getByRole("button", { name: "Open Preset", exact: true }).click()
  const dialog = page.getByRole("dialog", { name: "Open Preset" })
  const input = dialog.getByRole("textbox", { name: "Preset code" })
  await input.fill("a0")
  await expect(input).toHaveAttribute("aria-invalid", "true")
  await expect(
    dialog.getByRole("button", { name: "Open", exact: true })
  ).toBeDisabled()
  await input.fill("--preset b2Whd5Ob2")
  await input.press("Enter")
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(/preset=b2Whd5Ob2$/)
  await expect(frame.locator("html")).toHaveClass(/style-sera/)
  await page.getByRole("button", { name: "Copy preset" }).click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe("--preset b2Whd5Ob2")
})

test("Create pickers use shadcn's grouped menus in the dark Solid palette", async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto("/create/?preset=b2Whd5Ob2")
  await expect(page.locator("[data-create-ready]")).toBeVisible()
  const panel = page.getByRole("complementary", { name: "Preset settings" })
  // Nested .dark scopes re-derive aliases instead of inheriting light values.
  await expect(panel).toHaveCSS("--muted", "#122339")
  await expect(panel).toHaveCSS("--card-foreground", "#fff")

  const theme = page.getByRole("button", { name: "Theme", exact: true })
  await theme.click()
  const menu = page.getByRole("menu")
  await expect(menu.getByRole("separator")).toHaveCount(1)
  await expect(menu.getByRole("menuitemradio").first()).toHaveText("Mist")
  await page.keyboard.press("Escape")

  const menuColor = page.getByRole("button", { name: "Menu", exact: true })
  await expect(
    page.locator('[data-create-picker="Menu"] [data-create-value]')
  ).toHaveText("Default / Solid")
  await menuColor.click()
  await expect(menu.getByRole("group").getByRole("group")).toHaveText([
    /^Color/,
    /^Appearance/
  ])
  await menu.getByRole("menuitemradio", { name: "Translucent" }).click()
  await expect(menu).toBeVisible()
  await expect(
    page.locator('[data-create-picker="Menu"] [data-create-value]')
  ).toHaveText("Default / Translucent")
  await page.keyboard.press("Escape")

  await expect(
    page.getByRole("button", { name: "Radius", exact: true })
  ).toBeDisabled()
})

test("Create fits mobile and opens the preset drawer", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto("/create/")
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBe(360)
  const open = page.getByRole("button", { name: "Open Preset", exact: true })
  await expect(open).toHaveText("Open")
  await open.click()
  const drawer = page.getByRole("dialog", { name: "Open Preset" })
  await expect(drawer).toBeVisible()
  await drawer.getByRole("button", { name: "Cancel" }).click()
  await expect(drawer).toBeHidden()
})

test("a direct preset link themes the cards and top-layer menus in both system modes", async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: "light" })
  expect((await page.goto(example))?.ok()).toBe(true)
  const root = page.locator("html")
  await expect(root).toHaveClass("style-sera")
  await expect(root).toHaveCSS("--radius", "0px")
  await expect(root).toHaveCSS("--ring", "oklch(0.723 0.014 214.4)")
  await expect(page.locator("body")).toHaveCSS("font-family", /Geist Variable/)
  const button = page.getByRole("button", { name: "Save Threshold" })
  await expect(button).toHaveCSS(
    "background-color",
    "oklch(0.52 0.105 223.128)"
  )
  await expect(button).toHaveCSS("border-top-left-radius", "0px")
  // Chart placeholders follow the preset's chart color (fuchsia).
  await expect(
    page.locator('[data-preset-card="power-usage"] .bg-chart-2').first()
  ).toHaveCSS("background-color", "oklch(0.667 0.295 322.15)")
  await expect(
    page.locator('[data-preset-card="analytics-card"] svg')
  ).toHaveCSS("color", "oklch(0.833 0.145 321.434)")
  const notes = page.getByRole("textbox", { name: "Notes", exact: true })
  await expect(notes).toHaveCSS(
    "border-bottom-color",
    "oklch(0.925 0.005 214.3)"
  )
  await notes.focus()
  await expect(notes).toHaveCSS(
    "border-bottom-color",
    "oklch(0.723 0.014 214.4)"
  )

  await expect(page.locator("astro-island[ssr]")).toHaveCount(0)
  const trigger = page.getByRole("button", { name: "Account options" })
  await trigger.press("Enter")
  const menu = page.getByRole("menu")
  await expect(menu).toBeVisible()
  await expect(menu).toHaveCSS("background-color", "oklch(1 0 0)")
  await menu.getByRole("menuitem", { name: "Profile" }).press("Escape")
  await expect(trigger).toBeFocused()

  await page.emulateMedia({ colorScheme: "dark" })
  await expect(root).toHaveClass(/dark/)
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "oklch(0.148 0.004 228.8)"
  )
  await expect(button).toHaveCSS(
    "background-color",
    "oklch(0.45 0.085 224.283)"
  )
  await page.reload()
  await expect(root).toHaveClass(/style-sera/)
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0)
  await trigger.click()
  await expect(menu).toHaveCSS("background-color", "oklch(0.218 0.008 223.9)")
})

test("the site toggle overrides the system mode and updates an embedded preset preview", async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/docs/")
  const toggle = page.getByRole("button", { name: "Toggle theme" })
  await expect(toggle).toHaveAttribute("aria-pressed", "true")
  await toggle.click()
  await expect(toggle).toHaveAttribute("aria-pressed", "false")

  await page.evaluate((src) => {
    const iframe = document.createElement("iframe")
    iframe.title = "Preset preview"
    iframe.src = src
    document.body.append(iframe)
  }, example)
  const root = page
    .frameLocator('iframe[title="Preset preview"]')
    .locator("html")
  await expect(root).toHaveAttribute("data-color-mode", "light")
  await expect(root).toHaveClass("style-sera")
  await expect(root).toHaveCSS("--primary", "oklch(0.52 0.105 223.128)")

  await toggle.click()
  await expect(root).toHaveAttribute("data-color-mode", "dark")
  await expect(root).toHaveClass(/style-sera/)
  await expect(root).toHaveCSS("--primary", "oklch(0.45 0.085 224.283)")

  await toggle.click()
  await expect(root).toHaveAttribute("data-color-mode", "light")
  await expect(root).toHaveClass("style-sera")
})

test("default and unsupported presets use neutral colors", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto(preview)
  const root = page.locator("html")
  await expect(root).toHaveClass("style-nova")
  await expect(root).toHaveCSS("--primary", "oklch(0.205 0 0)")
  await expect(page.locator("#preset-notice")).toBeHidden()
  await page.goto(`${preview}?preset=a0`)
  await expect(root).toHaveCSS("--primary", "oklch(0.205 0 0)")
  await expect(page.locator("#preset-notice")).toBeVisible()
})

test("the static HTML already renders the cards with the neutral preview base", async ({
  browser,
  baseURL
}) => {
  const page = await browser.newPage({
    baseURL,
    javaScriptEnabled: false,
    colorScheme: "light"
  })
  try {
    await page.goto(example)
    await expect(page.locator("[data-preset-card]")).toHaveCount(cardCount)
    await expect(page.locator("html")).toHaveCSS(
      "--primary",
      "oklch(0.205 0 0)"
    )
    await expect(page.locator("body")).toHaveCSS(
      "font-family",
      /Inter Variable/
    )
  } finally {
    await page.close()
  }
})

test("heading font, inversion and transparency apply to their intended elements", async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: "light" })
  await page.goto(`${preview}?preset=b8OmeHVSIb`)
  await expect(
    page.locator(
      '[data-preset-card="payout-threshold"] [data-slot="card-title"]'
    )
  ).toHaveCSS("font-family", /Instrument Serif/)
  await expect(page.locator("body")).toHaveCSS("font-family", /Inter Variable/)
  const trigger = page.getByRole("button", { name: "Account options" })
  const menu = page.getByRole("menu")
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0)
  await trigger.click()
  await expect(menu).toHaveCSS("background-color", "oklch(0.216 0.006 56.043)")

  await page.goto(`${preview}?preset=b3`)
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0)
  await trigger.click()
  await expect(menu).toHaveCSS(
    "background-color",
    /(?:oklab|oklch)\(0\.205 0 0 \/ 0\.7\)/
  )
})

test("all cards fit a narrow screen and interactive demos work with the keyboard", async ({
  page
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto(example)
  const cards = page.locator("[data-preset-card]")
  await expect(cards).toHaveCount(cardCount)
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0)
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBe(360)

  const currency = page.getByRole("combobox", { name: "Preferred Currency" })
  await currency.press("Enter")
  await page.keyboard.press("ArrowDown")
  await page.keyboard.press("Enter")
  await expect(currency).toHaveText(/EUR — Euro/)

  const market = page.getByRole("checkbox", { name: "Market updates" })
  await market.press("Space")
  await expect(market).toBeChecked()

  const accountOptions = page
    .getByRole("button", { name: "Account options" })
    .first()
  await accountOptions.press("Enter")
  await expect(page.getByRole("menu")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(accountOptions).toBeFocused()
  expect(errors).toEqual([])
})
