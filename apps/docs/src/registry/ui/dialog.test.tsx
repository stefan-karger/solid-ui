import { render } from "@solidjs/web"
import { afterEach, describe, expect, it } from "vitest"

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog"

let dispose: VoidFunction | undefined

async function flushUpdates() {
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 0))
}

afterEach(() => {
  dispose?.()
  dispose = undefined
  document.body.innerHTML = ""
})

describe("dialog dismissal", () => {
  it("dismisses on Escape and removes popup content after unmounting", async () => {
    const host = document.createElement("div")
    document.body.append(host)
    dispose = render(
      () => (
        <Dialog>
          <DialogTrigger>Open test dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      ),
      host
    )
    const trigger = host.querySelector("button")!

    trigger.click()
    await flushUpdates()
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!
    expect(dialog).not.toBeNull()
    expect(dialog.getAttribute("aria-modal")).toBe("true")

    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))
    await flushUpdates()
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(document.querySelector("[data-slot=dialog-backdrop]")).toBeNull()

    trigger.click()
    await flushUpdates()
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    expect(document.querySelector("[role=dialog]")?.getAttribute("aria-modal")).toBe("true")

    dispose()
    dispose = undefined
    await flushUpdates()
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    expect(document.querySelector("[data-slot=dialog-backdrop]")).toBeNull()
  })
})
