import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { initializeCopyButtons, setCopyFeedback } from "./copy-buttons"

const icons = `
  <svg data-copy-icon></svg>
  <svg class="hidden" data-check-icon></svg>
`

function renderCopyButton() {
  document.body.innerHTML = `
    <button aria-label="Copy code" data-copy-button data-copy-value="pnpm dev" type="button">
      ${icons}
      <span aria-live="polite" data-copy-status></span>
    </button>
  `
  initializeCopyButtons()
  return document.querySelector<HTMLButtonElement>("[data-copy-button]")!
}

function feedback(root: HTMLElement, button: HTMLButtonElement) {
  return {
    state: button.dataset.copyState,
    label: button.getAttribute("aria-label"),
    status: root.querySelector("[data-copy-status]")?.textContent,
    copyHidden: root
      .querySelector("[data-copy-icon]")
      ?.classList.contains("hidden"),
    checkHidden: root
      .querySelector("[data-check-icon]")
      ?.classList.contains("hidden")
  }
}

const idle = {
  state: "idle",
  label: "Copy code",
  status: "",
  copyHidden: false,
  checkHidden: true
}

// Lets the awaited clipboard call settle without advancing fake timers.
async function settle() {
  for (let tick = 0; tick < 10; tick++) await Promise.resolve()
}

function mockClipboard(writeText?: () => Promise<void>) {
  vi.spyOn(console, "error").mockImplementation(() => {})
  vi.spyOn(console, "info").mockImplementation(() => {})
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: writeText ? { writeText: vi.fn(writeText) } : undefined
  })
}

describe("copy buttons", () => {
  const clipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard")

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    if (clipboard) Object.defineProperty(navigator, "clipboard", clipboard)
    else Reflect.deleteProperty(navigator, "clipboard")
    document.body.innerHTML = ""
  })

  it("announces a successful copy and resets after two seconds", async () => {
    mockClipboard(() => Promise.resolve())
    const button = renderCopyButton()

    button.click()
    await settle()
    expect(feedback(button, button)).toEqual({
      state: "success",
      label: "Code copied",
      status: "Code copied",
      copyHidden: true,
      checkHidden: false
    })
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("pnpm dev")

    vi.advanceTimersByTime(2000)
    expect(feedback(button, button)).toEqual(idle)
  })

  it.each([
    ["rejected", () => mockClipboard(() => Promise.reject(new Error("no")))],
    ["unavailable", () => mockClipboard()]
  ])("announces a %s copy without showing success", async (_, setup) => {
    setup()
    const button = renderCopyButton()

    button.click()
    await settle()
    expect(feedback(button, button)).toEqual({
      state: "error",
      label: "Copy failed",
      status: "Could not copy code",
      copyHidden: false,
      checkHidden: true
    })

    vi.advanceTimersByTime(2000)
    expect(feedback(button, button)).toEqual(idle)
  })

  it("keeps newer feedback when an earlier reset timer fires", async () => {
    mockClipboard(() => Promise.resolve())
    const button = renderCopyButton()
    initializeCopyButtons()

    button.click()
    await settle()
    expect(button.dataset.copyState).toBe("success")
    vi.advanceTimersByTime(1500)
    button.click()
    await settle()
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2)

    vi.advanceTimersByTime(600)
    expect(button.dataset.copyState).toBe("success")
    vi.advanceTimersByTime(1400)
    expect(button.dataset.copyState).toBe("idle")
  })

  it("applies the command wording to a separate feedback root", () => {
    document.body.innerHTML = `
      <div data-root>
        <button aria-label="Copy command" type="button">${icons}</button>
        <span aria-live="polite" data-copy-status></span>
      </div>
    `
    const root = document.querySelector<HTMLElement>("[data-root]")!
    const button = root.querySelector("button")!

    setCopyFeedback(button, root, "command", "error")
    expect(feedback(root, button)).toMatchObject({
      label: "Copy failed",
      status: "Could not copy command"
    })
    setCopyFeedback(button, root, "command", "success")
    expect(feedback(root, button)).toMatchObject({
      label: "Command copied",
      status: "Command copied",
      checkHidden: false
    })
  })
})
