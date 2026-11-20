import { render } from "@solidjs/web"
import { afterEach, expect, it, vi } from "vitest"

import { highlightCodeTokens } from "../lib/code-highlighter"
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
