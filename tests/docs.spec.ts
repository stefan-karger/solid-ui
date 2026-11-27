import { readdirSync } from "node:fs"

import { expect, test } from "@playwright/test"

import { hydrateAll } from "./hydrate"

const pages = ["components", "ai-elements"].flatMap((section) =>
  readdirSync(`apps/docs/dist/docs/${section}`, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${section}/${entry.name}`)
    .sort()
)

// `pnpm validate` hydrates these representative pages; `validate:full` all of them.
const smoke = new Set([
  "components/button",
  "components/combobox",
  "components/dialog",
  "ai-elements/prompt-input"
])

for (const slug of pages) {
  const tag = smoke.has(slug) ? " @smoke" : ""
  test(`hydrates every preview on the ${slug} docs page${tag}`, async ({
    page
  }) => {
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })
    const response = await page.goto(`/docs/${slug}/`)
    expect(response?.status()).toBe(200)
    await hydrateAll(page)
    await expect(
      page.getByText("The component preview could not be loaded.")
    ).toHaveCount(0)
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
