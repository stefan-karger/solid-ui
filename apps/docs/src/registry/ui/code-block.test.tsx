import { render } from "@solidjs/web"
import { afterEach, expect, it, vi } from "vitest"

import { highlightCodeTokens } from "../lib/highlighter"
import { CodeBlockCopyButton } from "./code-block"

let dispose: VoidFunction | undefined
afterEach(() => {
  dispose?.()
  document.body.innerHTML = ""
  vi.restoreAllMocks()
})
it("reports clipboard rejection without announcing a successful copy", async () => {
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
    new Error("Clipboard denied")
  )
  const host = document.createElement("div")
  document.body.append(host)
  dispose = render(
    () => <CodeBlockCopyButton value="const secret = false" />,
    host
  )
  host.querySelector("button")!.click()
  await vi.waitFor(() =>
    expect(host.querySelector("button")!.getAttribute("aria-label")).toBe(
      "Copy failed"
    )
  )
  expect(host.querySelector("[aria-live]")!.textContent).toBe("Copy failed")
  expect(host.querySelector("[data-copied]")).toBeNull()
})

it("exposes the upstream copy button theme hook and keeps caller classes", () => {
  const host = document.createElement("div")
  document.body.append(host)
  dispose = render(
    () => <CodeBlockCopyButton value="ok" class="custom-copy" />,
    host
  )
  const button = host.querySelector("button")!
  expect(button.classList).toContain("cn-code-block-copy-button")
  expect(button.classList).toContain("custom-copy")
})

it("highlights ANSI sequences for both color modes", async () => {
  const tokens = await highlightCodeTokens("\x1b[32mPassed\x1b[39m", "ansi")
  expect(tokens[0]?.[0]).toMatchObject({
    content: "Passed",
    htmlStyle: {
      "--token-light": expect.stringMatching(/^#/),
      "--token-dark": expect.stringMatching(/^#/)
    }
  })
})
