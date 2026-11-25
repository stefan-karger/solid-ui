import { render } from "@solidjs/web"
import { afterEach, expect, it } from "vitest"

import { AttachmentAction } from "./attachment"
import { Button } from "./button"

let dispose: VoidFunction | undefined
afterEach(() => {
  dispose?.()
  document.body.innerHTML = ""
})

it("defaults to a non-submitting button and keeps composed slots on anchors", () => {
  const host = document.createElement("div")
  document.body.append(host)
  dispose = render(
    () => (
      <>
        <Button>Default</Button>
        <Button type="submit">Save</Button>
        <AttachmentAction as="a" href="#file">
          Download
        </AttachmentAction>
      </>
    ),
    host
  )
  const [button, submit] = host.querySelectorAll("button")
  expect(button?.type).toBe("button")
  expect(button?.dataset.slot).toBe("button")
  expect(submit?.type).toBe("submit")
  const action = host.querySelector("a")
  expect(action?.dataset.slot).toBe("attachment-action")
  expect(action?.dataset.variant).toBe("ghost")
  expect(action?.dataset.size).toBe("icon-xs")
  expect(action?.getAttribute("type")).toBeNull()
  expect(action?.getAttribute("href")).toBe("#file")
})
