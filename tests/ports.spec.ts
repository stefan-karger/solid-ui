import { expect, test, type Page } from "@playwright/test"

function namedExample(page: Page, name: string) {
  return page.locator(
    `article [data-slot="component-preview"] astro-island[props*="${name}"]`
  )
}

async function example(page: Page, slug: string) {
  await page.goto(`/docs/components/${slug}/`)
  const island = page
    .locator('article [data-slot="component-preview"] astro-island')
    .first()
  await island.scrollIntoViewIfNeeded()
  await expect(island).not.toHaveAttribute("ssr", "")
  await expect(island).not.toContainText(
    "The component preview could not be loaded."
  )
  return island
}

test("dims disabled accordion triggers and skips them when tabbing", async ({
  page
}) => {
  await page.goto("/docs/components/accordion/")
  const preview = namedExample(page, "accordion-disabled")
  await preview.scrollIntoViewIfNeeded()
  await expect(preview).not.toHaveAttribute("ssr", "")
  const disabled = preview.getByRole("button", {
    name: "Premium feature information"
  })
  const enabled = preview.getByRole("button", {
    name: "Can I access my account history?"
  })
  const next = preview.getByRole("button", {
    name: "How do I update my email address?"
  })

  await expect(disabled).toHaveAttribute("aria-disabled", "true")
  await expect(disabled).toHaveCSS("opacity", "0.5")
  await expect(enabled).toHaveCSS("opacity", "1")
  await disabled.press("Enter")
  await expect(disabled).toHaveAttribute("aria-expanded", "false")
  await enabled.focus()
  await page.keyboard.press("Tab")
  await expect(next).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(enabled).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(enabled).toHaveAttribute("aria-expanded", "true")
})

test("centers accordion previews horizontally while keeping them top aligned", async ({
  page
}) => {
  await page.goto("/docs/components/accordion/")
  const card = namedExample(page, "accordion-card").locator(
    '[data-slot="card"]'
  )
  await expect(card).toBeVisible()
  const alignment = await card.evaluate((node) => {
    const stage = node.closest<HTMLElement>("[data-align]")!
    const preview = stage.getBoundingClientRect()
    const child = node.getBoundingClientRect()
    return {
      centerOffset:
        (preview.left + preview.right - child.left - child.right) / 2,
      topOffset: child.top - preview.top,
      paddingTop: parseFloat(getComputedStyle(stage).paddingTop)
    }
  })
  expect(alignment.centerOffset).toBeCloseTo(0, 1)
  expect(alignment.topOffset).toBeCloseTo(alignment.paddingTop, 1)

  const accordion = namedExample(page, "accordion-disabled").locator(
    '[data-slot="accordion"]'
  )
  await expect(accordion).toHaveCSS("max-width", "384px")
})

test("keeps the Select popup at trigger width in both alignment modes", async ({
  page
}) => {
  await page.goto("/docs/components/select/")
  const preview = namedExample(page, "select-align-item")
  await preview.scrollIntoViewIfNeeded()
  await expect(preview).not.toHaveAttribute("ssr", "")
  const trigger = preview.getByRole("combobox")
  const popup = preview.locator('[data-slot="select-content"][data-open]')

  await trigger.click()
  await expect(popup).toHaveCSS(
    "width",
    await trigger.evaluate((el) => getComputedStyle(el).width)
  )
  await popup.getByRole("option", { name: "Pineapple", exact: true }).click()
  await expect(trigger).toHaveText("Pineapple")
  await trigger.click()
  await expect(popup).toHaveCSS(
    "width",
    await trigger.evaluate((el) => getComputedStyle(el).width)
  )

  await page.keyboard.press("Escape")
  await expect(popup).toBeHidden()
  await preview.getByRole("switch", { name: "Align Item" }).uncheck()
  await trigger.click()
  await expect(popup).toHaveCSS(
    "width",
    await trigger.evaluate((el) => getComputedStyle(el).width)
  )
})

test("keeps the homepage currency popup at trigger width", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 })
  await page.goto("/")
  const trigger = page.getByRole("combobox", { name: "Preferred Currency" })
  await trigger.scrollIntoViewIfNeeded()
  await expect(
    trigger.locator("xpath=ancestor::astro-island")
  ).not.toHaveAttribute("ssr", "")

  await trigger.click()
  const popup = page.locator('[data-slot="select-content"][data-open]')
  await expect(popup).toHaveCSS(
    "width",
    await trigger.evaluate((el) => getComputedStyle(el).width)
  )
  await popup.getByRole("option", { name: "EUR — Euro", exact: true }).click()
  await expect(trigger).toHaveText("EUR — Euro")
})

test("keeps the homepage button group edges when its menu opens", async ({
  page
}) => {
  await page.goto("/")
  const trigger = page.getByRole("button", { name: "Open quick actions" })
  await trigger.scrollIntoViewIfNeeded()
  await expect(
    trigger.locator("xpath=ancestor::astro-island")
  ).not.toHaveAttribute("ssr", "")
  const radius = await trigger.evaluate(
    (el) => getComputedStyle(el).borderTopRightRadius
  )
  expect(parseFloat(radius)).toBeGreaterThan(0)

  await trigger.click()
  const menu = page.getByRole("menu").filter({ hasText: "Quick Actions" })
  await expect(menu).toBeVisible()
  const menuRadius = await menu.evaluate(
    (el) => getComputedStyle(el).borderTopRightRadius
  )
  expect(parseFloat(menuRadius)).toBeGreaterThan(0)
  await expect(menu).toHaveCSS("border-top-left-radius", menuRadius)
  await expect(menu).toHaveCSS("border-bottom-left-radius", menuRadius)
  await expect(trigger).toHaveCSS("border-top-right-radius", radius)
  await expect(trigger).toHaveCSS("border-bottom-right-radius", radius)
  await expect(trigger).toHaveCSS("border-right-width", "1px")
  await expect(trigger).toHaveCSS("border-left-width", "0px")
})

test("calendar selects dates with keys and enforces unavailable days", async ({
  page
}) => {
  const calendar = await example(page, "calendar")
  const selected = calendar.locator(
    '[data-slot="calendar-day"][aria-selected="true"]'
  )
  await selected.focus()
  await selected.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(calendar.locator("output")).toHaveText("2026-11-18")
  const unavailable = page
    .locator("article astro-island")
    .filter({ hasText: "Booked dates are unavailable." })
  await unavailable.scrollIntoViewIfNeeded()
  await expect(unavailable).not.toHaveAttribute("ssr", "")
  await expect(
    unavailable.locator('[data-slot="calendar-day"]').filter({ hasText: /^7$/ })
  ).toHaveAttribute("aria-disabled", "true")
})

test("attachment state styling includes shimmer and respects reduced motion", async ({
  page
}) => {
  const main = await example(page, "attachment")
  await expect(main.locator('img[alt="Workspace"]')).toBeVisible()
  await expect(main.getByText("sales-dashboard.pdf")).toBeVisible()
  await expect(main.locator('[data-slot="attachment-group"]')).not.toHaveCSS(
    "mask-image",
    "none"
  )
  const states = page
    .locator("article astro-island")
    .filter({ hasText: "market-research.pdf" })
  await states.scrollIntoViewIfNeeded()
  await expect(states).not.toHaveAttribute("ssr", "")
  const title = states.locator(
    '[data-state="processing"] [data-slot="attachment-title"]'
  )
  await expect(title).toHaveCSS("animation-name", "tw-shimmer")
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(title).toHaveCSS("animation-name", "none")
  expect(
    await title.evaluate((n) => getComputedStyle(n).webkitTextFillColor)
  ).not.toBe("rgba(0, 0, 0, 0)")
})

test("attachment triggers compose with links and SDK dialogs", async ({
  page
}) => {
  await page.goto("/docs/components/attachment/")
  const image = namedExample(page, "attachment-image")
  await expect(
    image.getByRole("link", { name: /^Open / }).first()
  ).toHaveAttribute("data-slot", "attachment-trigger")
  const preview = namedExample(page, "attachment-trigger")
  await preview.scrollIntoViewIfNeeded()
  await expect(preview).not.toHaveAttribute("ssr", "")
  const trigger = preview.getByRole("button", {
    name: "Preview research-summary.pdf"
  })
  await trigger.press("Enter")
  await expect(
    preview.getByRole("dialog", { name: "research-summary.pdf" })
  ).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(trigger).toBeFocused()
})

test("date picker opens a native calendar and restores trigger focus", async ({
  page
}) => {
  const picker = await example(page, "date-picker")
  const trigger = picker.getByRole("button", { name: "Pick a date" })
  const triggerElement = await trigger.elementHandle()
  await trigger.click()
  await expect(picker.getByRole("grid")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(picker.getByRole("grid")).toBeHidden()
  await expect(trigger).toBeFocused()
  expect(await triggerElement!.evaluate((element) => element.isConnected)).toBe(
    true
  )
  const editable = namedExample(page, "date-picker-input")
  await editable.scrollIntoViewIfNeeded()
  await expect(editable).not.toHaveAttribute("ssr", "")
  const input = editable.getByRole("textbox", { name: "Subscription Date" })
  await input.fill("11/20/2026")
  await input.press("Tab")
  await editable.getByRole("button", { name: "Select date" }).click()
  await expect(
    editable.locator('[data-slot="calendar-day"][aria-selected="true"]')
  ).toHaveText("20")
})

test("carousel pages through explicit slides and supports keyboard navigation", async ({
  page
}) => {
  const carousel = await example(page, "carousel")
  await carousel.getByRole("button", { name: "Next slide" }).click()
  await expect(
    carousel.locator('[data-slot="carousel-item"][data-active]')
  ).toHaveText("2")
  await carousel.locator('[data-slot="carousel-viewport"]').focus()
  await page.keyboard.press("ArrowRight")
  await expect(
    carousel.locator('[data-slot="carousel-item"][data-active]')
  ).toHaveText("3")
  await carousel.getByRole("button", { name: "Previous slide" }).click()
  await expect(
    carousel.locator('[data-slot="carousel-item"][data-active]')
  ).toHaveText("2")
})

test("OTP edits one native field and updates every visual slot", async ({
  page
}) => {
  const otp = await example(page, "input-otp")
  const input = otp.getByRole("textbox", { name: "Verification code" })
  await input.fill("123456")
  await expect(otp.locator("output")).toHaveText("123456")
  await expect(otp.locator('[data-slot="otp-input-slot"]')).toHaveText([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
  ])
  await input.press("End")
  await input.press("Backspace")
  await expect(otp.locator("output")).toHaveText("12345")
  await expect(
    otp.locator('[data-slot="otp-input-slot"][data-fake-caret]')
  ).toHaveCount(1)
})

test("resizable handles change panel geometry with keys and pointer", async ({
  page
}) => {
  const group = await example(page, "resizable")
  const panel = group.locator('[data-slot="resizable-panel"]').first()
  const handle = group.getByRole("separator", { name: "Resize files" })
  const before = await panel.evaluate((n) => n.getBoundingClientRect().width)
  await handle.focus()
  await handle.press("ArrowRight")
  await expect
    .poll(() => panel.evaluate((n) => n.getBoundingClientRect().width))
    .toBeGreaterThan(before)
  const rect = await handle.boundingBox()
  await page.mouse.move(rect!.x + rect!.width / 2, rect!.y + rect!.height / 2)
  await page.mouse.down()
  await page.mouse.move(rect!.x + 60, rect!.y + rect!.height / 2, { steps: 10 })
  await page.mouse.up()
  await expect
    .poll(() => panel.evaluate((n) => n.getBoundingClientRect().width))
    .toBeGreaterThan(before + 30)
})

test("drawer edits content, dismisses, and restores focus", async ({
  page
}) => {
  const drawer = await example(page, "drawer")
  const trigger = drawer.getByRole("button", { name: "Open drawer" })
  const triggerElement = await trigger.elementHandle()
  await trigger.click()
  const dialog = drawer.getByRole("dialog", { name: "Move goal" })
  await expect(dialog).toBeVisible()
  await dialog.getByRole("button", { name: "Increase goal" }).click()
  await expect(dialog.locator("output")).toHaveText("360")
  await dialog.getByRole("button", { name: "Save goal" }).click()
  await expect(dialog).toBeHidden()
  await expect(trigger).toBeFocused()
  expect(await triggerElement!.evaluate((element) => element.isConnected)).toBe(
    true
  )
})

test("toast actions, promise updates, and close use the native queue", async ({
  page
}) => {
  const sonner = await example(page, "sonner")
  const showToast = sonner.getByRole("button", { name: "Show Toast" })
  await showToast.click()
  const region = sonner.getByRole("region", { name: /Notifications/ })
  await expect(region).toContainText("Event has been created")
  await region.getByRole("button", { name: "Undo" }).click()
  await expect(region).toContainText("Event removed")
  await showToast.click()
  const toasts = region.locator('[data-slot="toast"]')
  await expect(toasts).toHaveCount(2)
  await expect(toasts.first()).toContainText("Event has been created")
  await expect
    .poll(() =>
      toasts.evaluateAll((nodes) => {
        const boxes = nodes
          .map((node) => node.getBoundingClientRect())
          .sort((a, b) => a.top - b.top)
        return boxes.length === 2 && boxes[0]!.bottom <= boxes[1]!.top
      })
    )
    .toBe(true)
  await toasts.first().getByRole("button", { name: "Close toast" }).click()
  await expect(region).not.toContainText("Event has been created")

  const types = namedExample(page, "sonner-types")
  await types.scrollIntoViewIfNeeded()
  await expect(types).not.toHaveAttribute("ssr", "")
  await types.getByRole("button", { name: "Promise" }).click()
  const promiseRegion = types.getByRole("region", { name: /Notifications/ })
  await expect(promiseRegion).toContainText("Loading...")
  await expect(promiseRegion).toContainText("Event has been created")
})

test("message scroller releases and resumes following growing content", async ({
  page
}) => {
  const chat = await example(page, "message-scroller")
  const viewport = chat.locator('[data-slot="scroll-area-viewport"]')
  const transcript = chat.getByRole("log")
  const send = chat.getByRole("button", { name: "Send", exact: true })
  const atEnd = () =>
    viewport.evaluate(
      (n) => Math.abs(n.scrollHeight - n.clientHeight - n.scrollTop) < 2
    )
  await expect(chat.getByText("Morning, shadcn!")).toBeVisible()
  await send.click()
  await expect(transcript).toHaveAttribute("aria-busy", "false")
  await send.click()
  await expect(transcript).toHaveAttribute("aria-busy", "false")
  await expect.poll(atEnd).toBe(true)
  await viewport.evaluate((n) => {
    n.scrollTop = 0
    n.dispatchEvent(new Event("scroll"))
  })
  const resume = chat.getByRole("button", { name: "Scroll to end" })
  await expect(resume).toBeVisible()
  await send.click()
  await expect(transcript).toHaveAttribute("aria-busy", "false")
  await expect(transcript).toContainText("scrolling up is a deliberate opt-out")
  expect(await viewport.evaluate((n) => n.scrollTop)).toBe(0)
  await resume.click()
  await expect.poll(atEnd).toBe(true)
  await send.click()
  await expect(transcript).toHaveAttribute("aria-busy", "false")
  await expect.poll(atEnd).toBe(true)
})

test("code block preserves empty lines, diff markers, and copies its source", async ({
  page,
  context
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  const code = await example(page, "code-block")
  await expect(code.locator('[data-slot="code-block-line"]')).toHaveCount(13)
  await expect(code.locator('[data-slot="code-block-line"]').nth(1)).toHaveText(
    "\n"
  )
  await code.getByRole("button", { name: "Copy code" }).click()
  await expect(code.getByRole("button", { name: "Copied" })).toBeVisible()
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replaceAll(
      "\r\n",
      "\n"
    )
  ).toContain("return result.toUIMessageStreamResponse()\n")
  const diff = page
    .locator("article astro-island")
    .filter({ hasText: "components/greeting.tsx" })
  await expect(
    diff.locator('[data-slot="code-block-line"][data-variant="added"]')
  ).toHaveText([
    'return <p class="text-sm text-muted-foreground">',
    "Hello, {name}!",
    "</p>"
  ])
})

test("trace disclosures toggle details with keyboard", async ({ page }) => {
  const trace = await example(page, "trace")
  const trigger = trace.getByRole("button", { name: "Used 2 sources" })
  const reference = trace.getByRole("link", { name: /^Continuous Integration/ })
  await trigger.focus()
  await trigger.press("Enter")
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(reference).toBeVisible()
  await trigger.press("Space")
  await expect(reference).toBeHidden()
})

test("questionnaire validates, preserves answers, and completes across step types", async ({
  page
}) => {
  const form = await example(page, "questionnaire")
  const next = form.getByRole("button", { name: "Next", exact: true })
  await next.click()
  await expect(form.getByRole("alert")).toContainText("Please answer")
  await form.getByRole("radio", { name: /Tool call timeline/ }).check()
  await next.click()
  await expect(
    form
      .locator("fieldset")
      .filter({ hasText: "What should every progress update include?" })
  ).toBeVisible()
  await form.getByRole("checkbox", { name: "Progress", exact: true }).check()
  await form.getByRole("checkbox", { name: "Decisions", exact: true }).check()
  await next.click()
  await form.getByRole("radio", { name: "Start now" }).check()
  await form.getByRole("button", { name: "Previous" }).click()
  await expect(
    form.getByRole("checkbox", { name: "Progress", exact: true })
  ).toBeChecked()
  await expect(
    form.getByRole("checkbox", { name: "Decisions", exact: true })
  ).toBeChecked()
  await next.click()
  await expect(form.getByRole("radio", { name: "Start now" })).toBeChecked()
  await form.getByRole("button", { name: "Save plan" }).click()
  await expect(
    form.getByRole("region", { name: /Notifications/ })
  ).toContainText("Agent plan saved")
})
