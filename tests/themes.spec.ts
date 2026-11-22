import { expect, test, type Page } from "@playwright/test"

import { styles } from "../apps/docs/src/lib/appearance"

async function openExample(
  page: Page,
  slug: string,
  theme: string,
  dark = false,
  rtl = false
) {
  await page.goto(`/docs/components/${slug}/`)
  for (const island of await page.locator("astro-island").all()) {
    await island.evaluate((node) =>
      node.parentElement?.scrollIntoView({ block: "center" })
    )
    await expect(island).not.toHaveAttribute("ssr", "")
  }
  await page.evaluate(
    ({ theme, dark, rtl }) => {
      const root = document.documentElement
      root.classList.remove(
        ...Array.from(root.classList).filter((name) =>
          name.startsWith("style-")
        )
      )
      root.classList.add(`style-${theme}`)
      root.classList.toggle("dark", dark)
      document.querySelectorAll<HTMLElement>("[dir]").forEach((node) => {
        node.dir = rtl ? "rtl" : "ltr"
      })
    },
    { theme, dark, rtl }
  )
}

for (const theme of styles) {
  for (const dark of [false, true]) {
    test(`${theme} ${dark ? "dark RTL" : "light LTR"} styles SDK controls and collection parts`, async ({
      page
    }) => {
      await openExample(page, "slider", theme, dark, dark)
      const tracks = page.locator(
        '[data-slot="slider-track"][data-orientation="horizontal"]'
      )
      for (const track of await tracks.all()) {
        await expect
          .poll(() =>
            track.evaluate((node) => node.getBoundingClientRect().width)
          )
          .toBeGreaterThan(100)
      }
      const input = page
        .locator('[data-slot="slider-thumb"] input[type="range"]')
        .first()
      await input.focus()
      const thumb = input.locator("..")
      const thumbRing = {
        nova: 3,
        vega: 4,
        mira: 2,
        maia: 4,
        lyra: 1,
        luma: 4,
        sera: 2,
        rhea: 4
      }[theme]!
      await expect(thumb).toHaveCSS(
        "--tw-ring-shadow",
        new RegExp(`${thumbRing}px`)
      )
      const before = await input.inputValue()
      await input.press("ArrowUp")
      await expect(input).not.toHaveValue(before)
      await expect(input).toBeFocused()

      await openExample(page, "combobox", theme, dark, dark)
      const combobox = page.locator('[data-slot="combobox-input"]').first()
      await expect(combobox).toHaveCSS(
        "font-size",
        theme === "mira" || theme === "lyra" ? "12px" : "14px"
      )
      const group = combobox.locator(
        'xpath=ancestor::*[@data-slot="input-group"][1]'
      )
      const borderBefore = await group.evaluate(
        (n) => getComputedStyle(n).borderBottomColor
      )
      await combobox.focus()
      const inputRing = {
        nova: 3,
        vega: 3,
        mira: 2,
        maia: 3,
        lyra: 1,
        luma: 3,
        sera: 1,
        rhea: 3
      }[theme]!
      if (theme === "sera")
        await expect
          .poll(() =>
            group.evaluate((n) => getComputedStyle(n).borderBottomColor)
          )
          .not.toBe(borderBefore)
      else
        await expect(group).toHaveCSS(
          "--tw-ring-shadow",
          new RegExp(`${inputRing}px`)
        )

      await openExample(page, "command", theme, dark, dark)
      const command = page.locator('[data-slot="command"]').first()
      await expect(
        command.locator('[data-ui="command-input-wrapper"]')
      ).toBeVisible()
      await expect(command.locator('[data-ui="command-input-icon"]')).toHaveCSS(
        "width",
        /.+px/
      )
      const heading = command
        .locator('[data-slot="command-group-label"]')
        .first()
      await expect(heading).toHaveCSS(
        "font-weight",
        theme === "lyra" ? "400" : theme === "sera" ? "600" : "500"
      )

      await openExample(page, "accordion", theme, dark, dark)
      const panel = page.locator('[data-slot="accordion-panel"]').first()
      const keyframes = await panel.evaluate(() => {
        const result: string[] = []
        function visit(rules: CSSRuleList) {
          for (const rule of rules) {
            if (
              rule instanceof CSSKeyframesRule &&
              rule.name === "solid-accordion-down"
            )
              result.push(rule.cssText)
            else if ("cssRules" in rule)
              visit((rule as CSSGroupingRule).cssRules)
          }
        }
        for (const sheet of document.styleSheets) visit(sheet.cssRules)
        return result.join("\n")
      })
      expect(keyframes).toContain("--accordion-panel-height")

      await openExample(page, "checkbox", theme, dark, dark)
      const checkbox = page.getByRole("checkbox").first()
      const checkboxColor = await checkbox.evaluate(
        (node) => getComputedStyle(node).backgroundColor
      )
      await checkbox.click()
      await expect(checkbox).toBeChecked()
      await expect(checkbox).toHaveAttribute("data-checked", "")
      await expect
        .poll(() =>
          checkbox.evaluate((node) => getComputedStyle(node).backgroundColor)
        )
        .not.toBe(checkboxColor)

      await openExample(page, "switch", theme, dark, dark)
      const toggle = page
        .locator('article[data-slot="docs"]')
        .getByRole("switch")
        .first()
      const switchColor = await toggle.evaluate(
        (node) => getComputedStyle(node).backgroundColor
      )
      await toggle.click()
      await expect(toggle).toBeChecked()
      await expect(toggle).toHaveAttribute("data-checked", "")
      await expect
        .poll(() =>
          toggle.evaluate((node) => getComputedStyle(node).backgroundColor)
        )
        .not.toBe(switchColor)

      await openExample(page, "tabs", theme, dark, dark)
      const tabs = page.getByRole("tablist").first().getByRole("tab")
      await tabs.nth(1).click()
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true")
      await expect(tabs.nth(1)).toHaveAttribute("data-selected", "")
    })
  }
}

test("native chips preserve the input, remove selections, and clear single values", async ({
  page
}) => {
  await openExample(page, "combobox", "nova")
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
  await page.getByRole("option", { name: "Nuxt.js", exact: true }).click()
  const clear = single.getByRole("button", { name: "Clear selection" })
  await expect(clear).toBeVisible()
  await clear.click()
  await expect(single.getByRole("combobox")).toHaveValue("")
  await expect(clear).toBeHidden()
})
