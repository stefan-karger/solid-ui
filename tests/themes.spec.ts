import { expect, test, type Page } from "@playwright/test"

import { styles } from "../apps/docs/src/lib/appearance"
import { hydrateAll } from "./hydrate"

// Each page loads once; the styles and modes switch in place, as the docs do.
const modes = [
  { name: "light LTR", dark: false },
  { name: "dark RTL", dark: true }
]

async function openExample(page: Page, slug: string) {
  await page.goto(`/docs/components/${slug}/`)
  await hydrateAll(page)
  // Read each style's end state instead of polling through its transitions.
  await page.addStyleTag({
    content: "*, ::before, ::after { transition: none !important }"
  })
}

async function applyStyle(page: Page, theme: string, dark = false) {
  await page.evaluate(
    ({ theme, dark }) => {
      const root = document.documentElement
      root.classList.remove(
        ...Array.from(root.classList).filter((name) =>
          name.startsWith("style-")
        )
      )
      root.classList.add(`style-${theme}`)
      root.classList.toggle("dark", dark)
      document.querySelectorAll<HTMLElement>("[dir]").forEach((node) => {
        node.dir = dark ? "rtl" : "ltr"
      })
    },
    { theme, dark }
  )
}

async function forEachStyle(
  page: Page,
  check: (theme: string, dark: boolean) => Promise<void>
) {
  for (const theme of styles)
    for (const { name, dark } of modes)
      await test.step(`${theme} ${name}`, async () => {
        await applyStyle(page, theme, dark)
        await check(theme, dark)
      })
}

const background = (node: Element) => getComputedStyle(node).backgroundColor

test("every style rings the focused slider thumb", async ({ page }) => {
  await openExample(page, "slider")
  const tracks = page.locator(
    '[data-slot="slider-track"][data-orientation="horizontal"]'
  )
  const input = page
    .locator('[data-slot="slider-thumb"] input[type="range"]')
    .first()
  await input.focus()
  const before = await input.inputValue()
  await input.press("ArrowUp")
  await expect(input).not.toHaveValue(before)
  const ring = {
    nova: 3,
    vega: 4,
    mira: 2,
    maia: 4,
    lyra: 1,
    luma: 4,
    sera: 2,
    rhea: 4
  }
  await forEachStyle(page, async (theme) => {
    for (const track of await tracks.all())
      await expect
        .poll(() =>
          track.evaluate((node) => node.getBoundingClientRect().width)
        )
        .toBeGreaterThan(100)
    await expect(input).toBeFocused()
    await expect(input.locator("..")).toHaveCSS(
      "--tw-ring-shadow",
      new RegExp(`${ring[theme as keyof typeof ring]}px`)
    )
  })
})

test("every style sizes and rings the combobox input", async ({ page }) => {
  await openExample(page, "combobox")
  const combobox = page.locator('[data-slot="combobox-input"]').first()
  const group = combobox.locator(
    'xpath=ancestor::*[@data-slot="input-group"][1]'
  )
  const ring = {
    nova: 3,
    vega: 3,
    mira: 2,
    maia: 3,
    lyra: 1,
    luma: 3,
    sera: 1,
    rhea: 3
  }
  await forEachStyle(page, async (theme) => {
    await expect(combobox).toHaveCSS(
      "font-size",
      theme === "mira" || theme === "lyra" ? "12px" : "14px"
    )
    await combobox.blur()
    const borderBefore = await group.evaluate(
      (node) => getComputedStyle(node).borderBottomColor
    )
    await combobox.focus()
    if (theme === "sera")
      await expect
        .poll(() =>
          group.evaluate((node) => getComputedStyle(node).borderBottomColor)
        )
        .not.toBe(borderBefore)
    else
      await expect(group).toHaveCSS(
        "--tw-ring-shadow",
        new RegExp(`${ring[theme as keyof typeof ring]}px`)
      )
  })
})

test("every style lays out command parts and keeps the accordion keyframes", async ({
  page
}) => {
  await openExample(page, "command")
  const command = page.locator('[data-slot="command"]').first()
  const heading = command.locator('[data-slot="command-group-label"]').first()
  await forEachStyle(page, async (theme) => {
    await expect(
      command.locator('[data-ui="command-input-wrapper"]')
    ).toBeVisible()
    await expect(command.locator('[data-ui="command-input-icon"]')).toHaveCSS(
      "width",
      /.+px/
    )
    await expect(heading).toHaveCSS(
      "font-weight",
      theme === "lyra" ? "400" : theme === "sera" ? "600" : "500"
    )
  })

  // The keyframes live in the shared utilities, not in a style.
  await openExample(page, "accordion")
  const keyframes = await page.evaluate(() => {
    const result: string[] = []
    function visit(rules: CSSRuleList) {
      for (const rule of rules) {
        if (
          rule instanceof CSSKeyframesRule &&
          rule.name === "solid-accordion-down"
        )
          result.push(rule.cssText)
        else if ("cssRules" in rule) visit((rule as CSSGroupingRule).cssRules)
      }
    }
    for (const sheet of document.styleSheets) visit(sheet.cssRules)
    return result.join("\n")
  })
  expect(keyframes).toContain("--accordion-panel-height")
})

for (const role of ["checkbox", "switch"] as const) {
  test(`every style colors the checked ${role}`, async ({ page }) => {
    await openExample(page, role)
    const control = page
      .locator('article[data-slot="docs"]')
      .getByRole(role)
      .first()
    await forEachStyle(page, async () => {
      const unchecked = await control.evaluate(background)
      await control.click()
      await expect(control).toBeChecked()
      await expect(control).toHaveAttribute("data-checked", "")
      await expect.poll(() => control.evaluate(background)).not.toBe(unchecked)
      await control.click()
      await expect(control).not.toBeChecked()
    })
  })
}

test("menus stay opaque outside the preset preview in every style", async ({
  page
}) => {
  const alpha = (node: Element) => {
    const probe = document.createElement("canvas").getContext("2d")!
    probe.fillStyle = getComputedStyle(node).backgroundColor
    probe.fillRect(0, 0, 1, 1)
    return probe.getImageData(0, 0, 1, 1).data[3]
  }
  for (const [slug, trigger, popup] of [
    ["select", "select-trigger", '[data-slot="select-content"]:visible'],
    ["dropdown-menu", "menu-trigger", '[role="menu"]']
  ]) {
    await openExample(page, slug!)
    await page
      .locator(`[data-slot="preview"] [data-slot="${trigger}"]`)
      .first()
      .click()
    const menu = page.locator(popup!).first()
    await expect(menu).toBeVisible()
    for (const theme of styles)
      await test.step(`${slug} ${theme}`, async () => {
        await applyStyle(page, theme)
        await expect.poll(() => menu.evaluate(alpha)).toBe(255)
      })
    await page.keyboard.press("Escape")
  }
})

for (const slug of ["button", "questionnaire"]) {
  test(`every style keeps the ${slug} examples inside their previews`, async ({
    page
  }) => {
    await openExample(page, slug)
    for (const theme of styles)
      await test.step(theme, async () => {
        await applyStyle(page, theme)
        // Theme fonts change text widths once they load.
        await page.evaluate(async () => {
          await new Promise(requestAnimationFrame)
          await document.fonts.ready
        })
        const clipped = await page.evaluate(() => {
          const scrolls = (node: Element) =>
            ["auto", "scroll"].includes(getComputedStyle(node).overflowX)
          return [
            ...document.querySelectorAll('[data-slot="preview"]')
          ].flatMap((preview) => {
            const bounds = preview.getBoundingClientRect()
            return [...preview.querySelectorAll("*")]
              .filter((node) => {
                if (node.closest("[popover], dialog")) return false
                for (
                  let parent = node.parentElement;
                  parent && parent !== preview;
                  parent = parent.parentElement
                )
                  if (scrolls(parent)) return false
                const box = node.getBoundingClientRect()
                if (!box.width && !box.height) return false
                return (
                  box.right > bounds.right + 1 || box.left < bounds.left - 1
                )
              })
              .map(
                (node) =>
                  `${
                    node
                      .closest("astro-island")
                      ?.getAttribute("props")
                      ?.match(/[a-z]+-[a-z-]+/)?.[0]
                  }: ${node.textContent?.trim().slice(0, 20)}`
              )
          })
        })
        expect(clipped).toEqual([])
      })
  })
}

test("native chips preserve the input, remove selections, and clear single values", async ({
  page
}) => {
  await openExample(page, "combobox")
  const previews = page.locator('[data-slot="component-preview"]')
  const multiple = previews.locator('astro-island[props*="combobox-multiple"]')
  const input = multiple.getByRole("combobox")
  const original = await input.elementHandle()
  await input.fill("No such framework")
  await expect(
    multiple.getByText("No items found.", { exact: true })
  ).toBeVisible()
  await input.fill("SvelteKit")
  await page.getByRole("option", { name: "SvelteKit", exact: true }).click()
  await expect(input).toHaveValue("")
  await expect(input).toBeFocused()
  expect(await original!.evaluate((node) => node.isConnected)).toBe(true)
  const chips = multiple.locator('[data-slot="combobox-chip"]')
  await expect(chips).toHaveCount(2)
  const svelte = chips.filter({ hasText: "SvelteKit" })
  await svelte.getByRole("button", { name: "Remove SvelteKit" }).click()
  await expect(chips).toHaveCount(1)
  await expect(chips).toContainText("Next.js")

  const single = previews.locator('astro-island[props*="combobox-clear"]')
  await single.getByRole("combobox").fill("Nuxt")
  await page
    .getByRole("listbox", { name: "Select a framework" })
    .getByRole("option", { name: "Nuxt.js", exact: true })
    .click()
  const clear = single.getByRole("button", { name: "Clear selection" })
  await expect(clear).toBeVisible()
  await clear.click()
  await expect(single.getByRole("combobox")).toHaveValue("")
  await expect(clear).toBeHidden()
})
