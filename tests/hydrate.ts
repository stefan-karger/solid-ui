import { expect, type Page } from "@playwright/test"

// Brings every client:visible island into view once, one frame each, so they
// all start hydrating together, then waits for the last one.
export async function hydrateAll(page: Page) {
  await page.evaluate(async () => {
    for (const island of document.querySelectorAll("astro-island[ssr]")) {
      island.parentElement?.scrollIntoView({ block: "center" })
      await new Promise(requestAnimationFrame)
      await new Promise(requestAnimationFrame)
    }
    window.scrollTo(0, 0)
  })
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0, {
    timeout: 30_000
  })
}
