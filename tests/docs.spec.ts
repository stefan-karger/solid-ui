import { readdirSync } from "node:fs"

import { expect, test } from "@playwright/test"

const pages = ["components", "ai-elements"].flatMap((section) =>
  readdirSync(`apps/docs/dist/docs/${section}`, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${section}/${entry.name}`)
    .sort()
)

for (const slug of pages) {
  test(`hydrates every preview on the ${slug} docs page`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })
    const response = await page.goto(`/docs/${slug}/`)
    expect(response?.status()).toBe(200)
    const islands = page.locator("astro-island")
    for (const island of await islands.all()) {
      await island.evaluate((node) =>
        node.parentElement?.scrollIntoView({ block: "center" })
      )
      await expect(island).not.toHaveAttribute("ssr", "", { timeout: 30_000 })
      await expect(island).not.toContainText(
        "The component preview could not be loaded."
      )
    }
    if (slug === "components/navigation-menu") {
      const preview = page.locator('article[data-slot="docs"]')
      await preview
        .getByRole("button", { name: "Getting started", exact: true })
        .click()
      await expect(
        preview.getByRole("link", { name: /^Introduction/ })
      ).toBeVisible()
      await page.keyboard.press("Escape")
      await expect(
        preview.getByRole("link", { name: /^Introduction/ })
      ).toBeHidden()
    }
    expect(errors).toEqual([])
  })
}
