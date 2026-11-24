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

for (const theme of styles) {
  test(`${theme} dark mode applies parent-relative variants`, async ({
    page
  }) => {
    // Sera keeps upstream's outlined checked state, which never applies a fill.
    if (theme !== "sera") {
      await openExample(page, "questionnaire", theme, true)
      const resume = page.locator('astro-island[props*="questionnaire-resume"]')
      const indicator = resume
        .locator('[data-slot="questionnaire-choice"][data-checked]')
        .first()
        .locator(".cn-questionnaire-choice-indicator")
      const [indicatorColor, primary] = await indicator.evaluate((node) => {
        const probe = document.createElement("span")
        probe.style.backgroundColor = "var(--primary)"
        node.append(probe)
        const result = [
          getComputedStyle(node).backgroundColor,
          getComputedStyle(probe).backgroundColor
        ]
        probe.remove()
        return result
      })
      expect(indicatorColor).toBe(primary)
    }

    await openExample(page, "kbd", theme, true)
    const tooltip = page.locator('astro-island[props*="kbd-tooltip"]')
    await tooltip.locator('[data-slot="tooltip-trigger"]').first().hover()
    const kbd = page
      .locator('[data-slot="tooltip-content"] [data-slot="kbd"]')
      .first()
    await expect(kbd).toBeVisible()
    const [kbdColor, expected] = await kbd.evaluate((node) => {
      const probe = document.createElement("span")
      probe.style.backgroundColor =
        "color-mix(in oklab, var(--background) 10%, transparent)"
      node.append(probe)
      const result = [
        getComputedStyle(node).backgroundColor,
        getComputedStyle(probe).backgroundColor
      ]
      probe.remove()
      return result
    })
    expect(kbdColor).toBe(expected)
  })
}

for (const theme of styles) {
  test(`${theme} menus stay opaque outside the preset preview`, async ({
    page
  }) => {
    const alpha = (node: Element) => {
      const probe = document.createElement("canvas").getContext("2d")!
      probe.fillStyle = getComputedStyle(node).backgroundColor
      probe.fillRect(0, 0, 1, 1)
      return probe.getImageData(0, 0, 1, 1).data[3]
    }

    await openExample(page, "select", theme)
    await page
      .locator('[data-slot="preview"] [data-slot="select-trigger"]')
      .first()
      .click()
    const select = page.locator('[data-slot="select-content"]:visible').first()
    await expect(select).toBeVisible()
    expect(await select.evaluate(alpha)).toBe(255)
    await page.keyboard.press("Escape")

    await openExample(page, "dropdown-menu", theme)
    await page
      .locator('[data-slot="preview"] [data-slot="menu-trigger"]')
      .first()
      .click()
    const menu = page.getByRole("menu").first()
    await expect(menu).toBeVisible()
    expect(await menu.evaluate(alpha)).toBe(255)
  })
}

for (const theme of styles) {
  test(`${theme} combobox popups span their input group`, async ({ page }) => {
    await openExample(page, "combobox", theme)
    const previews = page.locator('[data-slot="component-preview"]')
    const content = page.locator('[data-slot="combobox-content"]:visible')
    const width = (locator: typeof content) =>
      locator.evaluate((node) => node.getBoundingClientRect().width)

    const demo = previews.locator('astro-island[props*="combobox-demo"]')
    await demo.locator('[data-slot="combobox-trigger"]').click()
    await expect(content).toHaveCount(1)
    const group = await width(demo.locator('[data-slot="input-group"]'))
    // Upstream adds a fixed trigger width; rounded themes keep a few pixels of inset.
    expect(await width(content)).toBeGreaterThanOrEqual(group - 8)
    await page.keyboard.press("Escape")
    await expect(content).toHaveCount(0)

    const multiple = previews.locator(
      'astro-island[props*="combobox-multiple"]'
    )
    await multiple.getByRole("combobox").click()
    await expect(content).toHaveCount(1)
    const chips = await width(multiple.locator('[data-slot="combobox-chips"]'))
    expect(Math.abs((await width(content)) - chips)).toBeLessThanOrEqual(2)
  })
}

for (const theme of styles) {
  test(`${theme} calendar weekday labels stay apart`, async ({ page }) => {
    await openExample(page, "calendar", theme)
    const cramped = await page
      .locator('[data-slot="preview"] [data-slot="calendar-weekdays"]')
      .first()
      .evaluate((row) =>
        [...row.querySelectorAll('[data-slot="calendar-weekday"]')]
          .filter((cell) => {
            const range = document.createRange()
            range.selectNodeContents(cell)
            const label = range.getBoundingClientRect().width
            const probe = document.createElement("span")
            probe.style.cssText =
              "position:absolute;display:block;width:var(--cell-size)"
            cell.append(probe)
            const size = probe.getBoundingClientRect().width
            probe.remove()
            return label > size - 2
          })
          .map((cell) => cell.textContent)
      )
    expect(cramped).toEqual([])
  })
}

for (const theme of styles) {
  test(`${theme} keeps button and questionnaire examples inside their previews`, async ({
    page
  }) => {
    for (const slug of ["button", "questionnaire"]) {
      await openExample(page, slug, theme)
      // Theme fonts change text widths once they load.
      await page.evaluate(() => document.fonts.ready)
      const clipped = await page.evaluate(() => {
        const scrolls = (node: Element) =>
          ["auto", "scroll"].includes(getComputedStyle(node).overflowX)
        return [...document.querySelectorAll('[data-slot="preview"]')].flatMap(
          (preview) => {
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
          }
        )
      })
      expect(clipped, slug).toEqual([])
    }
  })
}

for (const theme of styles) {
  test(`${theme} questionnaire shows dots, checks and shortcuts`, async ({
    page
  }) => {
    await openExample(page, "questionnaire", theme)
    const previews = page.locator('[data-slot="component-preview"]')
    const display = (locator: ReturnType<typeof page.locator>) =>
      locator.evaluate((node) => getComputedStyle(node).display)

    const demo = previews.locator('astro-island[props*="questionnaire-demo"]')
    const radio = demo.locator('[data-slot="questionnaire-choice"]').first()
    await radio.getByRole("radio").click()
    await expect(radio).toHaveAttribute("data-checked", "")
    expect(
      await display(
        radio.locator('[data-slot="questionnaire-choice-indicator-dot"]')
      )
    ).not.toBe("none")
    expect(
      await display(
        radio.locator('[data-slot="questionnaire-choice-indicator-check"]')
      )
    ).toBe("none")

    const multiple = previews.locator(
      'astro-island[props*="questionnaire-multiple"]'
    )
    const checkbox = multiple
      .locator('[data-slot="questionnaire-choice"]')
      .first()
    await checkbox.getByRole("checkbox").click()
    await expect(checkbox).toHaveAttribute("data-checked", "")
    expect(
      await display(
        checkbox.locator('[data-slot="questionnaire-choice-indicator-check"]')
      )
    ).not.toBe("none")
    expect(
      await display(
        checkbox.locator('[data-slot="questionnaire-choice-indicator-dot"]')
      )
    ).toBe("none")

    const shortcuts = previews.locator(
      'astro-island[props*="questionnaire-shortcuts"]'
    )
    const badges = shortcuts.locator(
      '[data-slot="questionnaire-choice-shortcut"]'
    )
    await expect(badges).toHaveText(["A", "B", "C"])
    await expect(badges.first()).toBeVisible()
    await shortcuts.getByRole("radio").first().focus()
    await page.keyboard.press("b")
    await expect(
      shortcuts.locator('[data-slot="questionnaire-choice"]').nth(1)
    ).toHaveAttribute("data-checked", "")
  })
}

for (const theme of styles) {
  test(`${theme} select pads groups and uses the theme ring`, async ({
    page
  }) => {
    await openExample(page, "select", theme)
    const groups = page.locator(
      '[data-slot="component-preview"] astro-island[props*="select-groups"]'
    )
    await groups.locator('[data-slot="select-trigger"]').click()
    const content = page.locator('[data-slot="select-content"]:visible')
    await expect(content).toBeVisible()
    const groupPadding =
      { lyra: "0px", luma: "6px", sera: "6px" }[theme] ?? "4px"
    await expect(
      content.locator('[data-slot="select-group"]').first()
    ).toHaveCSS("padding-top", groupPadding)
    await expect(content.locator('[data-slot="select-list"]')).toHaveCSS(
      "padding-top",
      "0px"
    )
    const [shadow, ring] = await content.evaluate((node, theme) => {
      const probe = document.createElement("span")
      const amount = ["maia", "luma", "rhea"].includes(theme) ? 5 : 10
      probe.style.color = `color-mix(in oklab, var(--foreground) ${amount}%, transparent)`
      node.append(probe)
      const result = [
        getComputedStyle(node).boxShadow,
        getComputedStyle(probe).color
      ]
      probe.remove()
      return result
    }, theme)
    expect(shadow).toContain(ring)
  })
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
