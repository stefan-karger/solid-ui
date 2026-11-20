import { expect, test } from "@playwright/test"

let errors: string[] = []
test.afterEach(() => {
  expect(errors).toEqual([])
})

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const serverNodes = new Map<string, Element>()
    Object.assign(window, { serverNodes })
    new MutationObserver(() => {
      for (const selector of [
        "#first button",
        "#second button",
        "#dialog button",
        "#combobox input[role=combobox]"
      ]) {
        const node = document.querySelector(selector)
        if (node?.closest("astro-island[ssr]") && !serverNodes.has(selector))
          serverNodes.set(selector, node)
      }
    }).observe(document, { childList: true, subtree: true })
  })
  errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  await page.goto("/")
  await expect(page.locator("#only button")).toHaveText("count: 10", {
    timeout: 30_000
  })
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0, {
    timeout: 30_000
  })
  expect(errors).toEqual([])
})

test("hydrates independent islands, preserves slots and replaces client-only fallbacks", async ({
  page
}) => {
  // Cold Vite dependency discovery can reload the document after its first load.
  // Check the completed document and report each node rather than a single boolean.
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          if (
            document.querySelector("astro-island[ssr]") ||
            !document.querySelector("#only button")
          )
            return []
          const nodes = (
            window as Window & { serverNodes: Map<string, Element> }
          ).serverNodes
          return [
            "#first button",
            "#second button",
            "#dialog button",
            "#combobox input[role=combobox]"
          ].map((selector) => ({
            selector,
            preserved:
              nodes.has(selector) &&
              nodes.get(selector) === document.querySelector(selector)
          }))
        }),
      { timeout: 30_000 }
    )
    .toEqual(
      [
        "#first button",
        "#second button",
        "#dialog button",
        "#combobox input[role=combobox]"
      ].map((selector) => ({ selector, preserved: true }))
    )
  await expect(page.locator("#first b")).toHaveText([
    "Default slot",
    "Named slot"
  ])
  await page.locator("#first button").click()
  await expect(page.locator("#first button")).toHaveText("count: 4")
  await expect(page.locator("#second button")).toHaveText("count: 7")
  await page.locator("#only button").click()
  await expect(page.locator("#only button")).toHaveText("count: 11")
  await expect(page.locator("#only")).not.toContainText("Fallback content")
  await expect(page.locator("#only b")).toHaveText([
    "Client default slot",
    "Client named slot"
  ])
  await expect(page.locator("#static")).toContainText("Static slot")
  await expect(page.locator("#static astro-island")).toHaveCount(0)
  await expect(page.locator("#lazy")).toHaveText("Resolved lazy component")
})

// Adapted from upstream solid-component.test.ts: lazy-only CSS must reach the
// initial HTML, including static islands, and be deduplicated per page.
test("delivers lazy CSS before hydration and deduplicates production styles", async ({
  page,
  request,
  browser
}, testInfo) => {
  const response = await request.get("/")
  const html = await response.text()
  const initial = await browser.newPage({ javaScriptEnabled: false })
  await initial.goto("/")
  for (const selector of ["#lazy p", "#lazy-again p", "#lazy-static p"])
    await expect(initial.locator(selector)).toHaveCSS(
      "color",
      "rgb(11, 93, 173)"
    )
  const styles =
    html.match(
      /<style\b[^>]*>[\s\S]*?<\/style>|<link\b[^>]*rel="stylesheet"[^>]*>/g
    ) ?? []
  let deliveries = 0
  for (const style of styles) {
    const href = /href="([^"]+)"/.exec(style)?.[1]
    const css = href ? await (await request.get(href)).text() : style
    if (css.includes(".adapter-lazy-style")) deliveries++
  }
  if (testInfo.project.name === "production") expect(deliveries).toBe(1)
  else expect(deliveries).toBeGreaterThanOrEqual(1)
  await expect(page.locator("#lazy p")).toHaveCSS("color", "rgb(11, 93, 173)")
  await initial.close()
})

test("disposes on astro:unmount", async ({ page }) => {
  await page.evaluate(() => {
    document.body.dataset.disposed = "0"
    window.addEventListener("counter:disposed", () => {
      document.body.dataset.disposed = String(
        Number(document.body.dataset.disposed) + 1
      )
    })
    document
      .querySelector("#first astro-island")!
      .dispatchEvent(new Event("astro:unmount"))
  })
  await expect(page.locator("body")).toHaveAttribute("data-disposed", "1")
})

test("dismisses a modal dialog and restores trigger focus", async ({
  page
}) => {
  const trigger = page.getByRole("button", { name: "Open Dialog", exact: true })
  await trigger.click()
  const dialog = page.getByRole("dialog", { name: "Edit profile" })
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute("aria-modal", "true")
  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await dialog.getByRole("button", { name: "Cancel", exact: true }).click()
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
})

test("dismisses menus with Escape and activates tabs with the keyboard", async ({
  page
}) => {
  const trigger = page
    .locator("#menu")
    .getByRole("button", { name: "Open", exact: true })
  await trigger.click()
  await expect(page.getByRole("menu").first()).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("menu")).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await page.getByRole("tab", { name: "Overview", exact: true }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(
    page.getByRole("tab", { name: "Analytics", exact: true })
  ).toHaveAttribute("aria-selected", "true")
  await expect(
    page.getByRole("tabpanel", { name: "Analytics", exact: true })
  ).toBeVisible()
})

test("filters a combobox and selects an option without hydration errors", async ({
  page
}) => {
  const input = page.locator("#combobox").getByRole("combobox")
  await input.fill("Svelte")
  await page.keyboard.press("ArrowDown")
  await page.keyboard.press("Enter")
  await expect(input).toHaveValue("Svelte")
  await expect(input).toHaveAttribute("aria-expanded", "false")
  await page.locator("#select").getByRole("combobox").click()
  await page.getByRole("option", { name: "Banana", exact: true }).click()
  await expect(page.locator("#select").getByRole("combobox")).toContainText(
    "Banana"
  )
})
