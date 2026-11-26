import { expect, test } from "@playwright/test"
test("hydrates native SDK components and updates active descendants @smoke", async ({
  page
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/native")
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0, {
    timeout: 30_000
  })
  expect(errors).toEqual([])
  const input = page.getByRole("combobox")
  await input.fill("Beta")
  await expect(page.getByRole("option", { name: "Beta" })).toHaveAttribute(
    "data-highlighted",
    ""
  )
  await expect(input).toHaveAttribute(
    "aria-activedescendant",
    (await page.getByRole("option", { name: "Beta" }).getAttribute("id")) ?? ""
  )
  await input.press("Enter")
  await expect(input).toHaveValue("Beta")
})
