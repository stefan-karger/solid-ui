import { render } from "@solidjs/web"
import { afterEach, expect, it, vi } from "vitest"

import { AttachmentAction, AttachmentTrigger } from "./attachment"
import { Badge } from "./badge"
import { BreadcrumbLink } from "./breadcrumb"
import { BubbleContent } from "./bubble"
import { Button } from "./button"
import { Marker } from "./marker"
import { Separator } from "./separator"
import { TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger } from "./trace"

let dispose: VoidFunction | undefined
afterEach(() => {
  dispose?.()
  document.body.innerHTML = ""
})

function attach() {
  const host = document.createElement("div")
  document.body.append(host)
  return host
}

it("renders an attachment trigger as a button or an anchor with the supplied props", () => {
  const host = attach()
  const click = vi.fn()
  const ref = vi.fn()
  dispose = render(
    () => (
      <>
        <AttachmentTrigger>Preview</AttachmentTrigger>
        <AttachmentTrigger
          id="download"
          aria-label="Download attachment"
          class="custom-trigger"
          onClick={click}
          ref={ref}
          render={(part) => <a {...part} href="#file" />}
        >
          Download
        </AttachmentTrigger>
      </>
    ),
    host
  )
  expect(host.querySelector("button")?.type).toBe("button")
  const link = host.querySelector("a")!
  expect(link.getAttribute("type")).toBeNull()
  expect(link.id).toBe("download")
  expect(link.getAttribute("aria-label")).toBe("Download attachment")
  expect(link.dataset.slot).toBe("attachment-trigger")
  expect(link.classList.contains("custom-trigger")).toBe(true)
  expect(link.textContent).toBe("Download")
  expect(ref).toHaveBeenCalledWith(link)
  link.click()
  expect(click).toHaveBeenCalledTimes(1)
})

it("forwards name, content, attributes, and handlers through marker and bubble renderers", () => {
  const host = attach()
  const click = vi.fn()
  dispose = render(
    () => (
      <>
        <Marker id="marker" variant="separator" render={(part) => <a {...part} href="#updates" />}>
          Updates
        </Marker>
        <BubbleContent
          id="message"
          aria-label="Open message"
          onClick={click}
          render={(part) => <button type="button" {...part} />}
        >
          Message
        </BubbleContent>
      </>
    ),
    host
  )
  const link = host.querySelector("a")!
  expect(link.id).toBe("marker")
  expect(link.dataset.variant).toBe("separator")
  expect(link.textContent).toBe("Updates")
  const button = host.querySelector("button")!
  expect(button.id).toBe("message")
  expect(button.getAttribute("aria-label")).toBe("Open message")
  expect(button.textContent).toBe("Message")
  button.click()
  expect(click).toHaveBeenCalledTimes(1)
})

it("preserves the composed Button slot when an action renders as an anchor", () => {
  const host = attach()
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
  expect(action?.textContent).toBe("Download")
})

it("renders native as overrides with the consumer's attributes", () => {
  const host = attach()
  dispose = render(
    () => (
      <>
        <Badge as="a" href="#work">
          Work
        </Badge>
        <BreadcrumbLink as="button" type="button">
          Current page
        </BreadcrumbLink>
      </>
    ),
    host
  )
  expect(host.querySelector("a")?.getAttribute("href")).toBe("#work")
  expect(host.querySelector("a")?.dataset.slot).toBe("badge")
  expect(host.querySelector("button")?.dataset.slot).toBe("breadcrumb-link")
  expect(host.querySelector("button")?.textContent).toBe("Current page")
})

it("preserves composed separator and trace slots with their SDK semantics", () => {
  const host = attach()
  dispose = render(
    () => (
      <>
        <Separator data-slot="item-separator" orientation="vertical" />
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>Details</TraceCollapsibleTrigger>
          <TraceCollapsibleContent>Trace output</TraceCollapsibleContent>
        </TraceCollapsible>
      </>
    ),
    host
  )
  const separator = host.querySelector('[data-slot="item-separator"]')
  expect(separator?.getAttribute("aria-orientation")).toBe("vertical")
  const trace = host.querySelector('[data-slot="trace-collapsible"]')
  expect(trace?.querySelector("button")?.dataset.slot).toBe("trace-collapsible-trigger")
  expect(trace?.querySelector("button")?.getAttribute("aria-expanded")).toBe("true")
  expect(trace?.querySelector('[data-slot="trace-collapsible-content"]')?.textContent).toBe(
    "Trace output"
  )
})
