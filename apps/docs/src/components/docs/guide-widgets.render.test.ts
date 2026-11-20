import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { beforeAll, describe, expect, it } from "vitest"

import AlertAction from "./alert-action.astro"
import AlertDescription from "./alert-description.astro"
import AlertTitle from "./alert-title.astro"
import Alert from "./alert.astro"
import AspectRatio from "./aspect-ratio.astro"
import Button from "./button.astro"
import CodeCollapsibleWrapper from "./code-collapsible-wrapper.astro"
import KbdGroup from "./kbd-group.astro"
import Kbd from "./kbd.astro"
import LinkedCard from "./linked-card.astro"

const occurrences = (value: string, search: string) =>
  value.split(search).length - 1

describe("static guide widgets", () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>

  beforeAll(async () => {
    container = await AstroContainer.create()
  })

  it("renders linked cards as static anchors and forwards attributes", async () => {
    const slot = "linked-card-slot-token"
    const html = await container.renderToString(LinkedCard, {
      props: {
        class: "linked-card-custom",
        href: "/docs/example",
        rel: "noreferrer",
        target: "_blank",
        title: "Example guide"
      },
      slots: { default: slot }
    })

    expect(html).toMatch(/^<a\b/)
    expect(html).toContain('href="/docs/example"')
    expect(html).toContain('title="Example guide"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noreferrer"')
    expect(html).toContain("linked-card-custom")
    expect(html).toContain("data-not-typeset")
    expect(occurrences(html, slot)).toBe(1)
  })

  it("renders keyboard markup with stable data slots", async () => {
    const keySlot = "kbd-slot-token"
    const groupSlot = "kbd-group-slot-token"
    const keyHtml = await container.renderToString(Kbd, {
      props: { class: "kbd-custom" },
      slots: { default: keySlot }
    })
    const groupHtml = await container.renderToString(KbdGroup, {
      props: { class: "kbd-group-custom" },
      slots: { default: groupSlot }
    })

    expect(keyHtml).toMatch(/^<kbd\b/)
    expect(keyHtml).toContain('data-slot="kbd"')
    expect(keyHtml).toContain("kbd-custom")
    expect(occurrences(keyHtml, keySlot)).toBe(1)
    expect(groupHtml).toMatch(/^<div\b/)
    expect(groupHtml).toContain('data-slot="kbd-group"')
    expect(groupHtml).toContain("kbd-group-custom")
    expect(occurrences(groupHtml, groupSlot)).toBe(1)
  })

  it("renders valid aspect ratios and preserves caller styling", async () => {
    const slot = "aspect-ratio-slot-token"
    const html = await container.renderToString(AspectRatio, {
      props: {
        class: "aspect-ratio-custom",
        "data-example": "ratio",
        ratio: 2,
        style: { background: "red" }
      },
      slots: { default: slot }
    })

    expect(html).toContain('data-slot="aspect-ratio"')
    expect(html).toContain('data-example="ratio"')
    expect(html).toContain("aspect-ratio-custom")
    expect(html).toMatch(/style="[^"]*--ratio:\s*2(?:;|&quot;)/)
    expect(html).toMatch(/style="[^"]*background:\s*red/)
    expect(occurrences(html, slot)).toBe(1)

    const stringStyleHtml = await container.renderToString(AspectRatio, {
      props: { ratio: 4 / 3, style: "outline: 1px solid red" }
    })

    expect(stringStyleHtml).toContain("--ratio: 1.3333333333333333")
    expect(stringStyleHtml).toContain("outline: 1px solid red")
  })

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid aspect ratio %s",
    async (ratio) => {
      await expect(
        container.renderToString(AspectRatio, { props: { ratio } })
      ).rejects.toThrow(
        "[AspectRatio] `ratio` must be a positive finite number."
      )
    }
  )

  it("composes alert parts with roles, variants, and stable data slots", async () => {
    const title = await container.renderToString(AlertTitle, {
      slots: { default: "Alert title" }
    })
    const description = await container.renderToString(AlertDescription, {
      slots: { default: "Alert description" }
    })
    const action = await container.renderToString(AlertAction, {
      slots: { default: "Alert action" }
    })
    const html = await container.renderToString(Alert, {
      props: { class: "alert-custom", variant: "destructive" },
      slots: { default: `${title}${description}${action}` }
    })

    expect(html).toContain('role="note"')
    expect(html).toContain("cn-alert-variant-destructive")
    expect(html).toContain("alert-custom")
    expect(html).toContain('data-slot="alert"')
    expect(html).toContain('data-slot="alert-title"')
    expect(html).toContain('data-slot="alert-description"')
    expect(html).toContain('data-slot="alert-action"')
    expect(occurrences(html, "Alert title")).toBe(1)
    expect(occurrences(html, "Alert description")).toBe(1)
    expect(occurrences(html, "Alert action")).toBe(1)

    const statusHtml = await container.renderToString(Alert, {
      props: { role: "status" }
    })
    expect(statusHtml).toContain('role="status"')
  })

  it("renders links or native buttons and forwards caller attributes", async () => {
    const linkSlot = "button-link-slot-token"
    const linkHtml = await container.renderToString(Button, {
      props: {
        class: "button-link-custom",
        href: "/docs/action",
        rel: "next",
        size: "sm",
        variant: "outline"
      },
      slots: { default: linkSlot }
    })

    expect(linkHtml).toMatch(/^<a\b/)
    expect(linkHtml).toContain('href="/docs/action"')
    expect(linkHtml).toContain('rel="next"')
    expect(linkHtml).toContain("button-link-custom")
    expect(linkHtml).toContain("cn-button-variant-outline")
    expect(linkHtml).toContain("cn-button-size-sm")
    expect(linkHtml).toContain('data-slot="button"')
    expect(linkHtml).toContain("data-not-typeset")
    expect(occurrences(linkHtml, linkSlot)).toBe(1)

    const buttonSlot = "native-button-slot-token"
    const buttonHtml = await container.renderToString(Button, {
      props: { "aria-label": "Perform action", class: "native-button-custom" },
      slots: { default: buttonSlot }
    })

    expect(buttonHtml).toMatch(/^<button\b/)
    expect(buttonHtml).toContain('type="button"')
    expect(buttonHtml).toContain('aria-label="Perform action"')
    expect(buttonHtml).toContain("native-button-custom")
    expect(occurrences(buttonHtml, buttonSlot)).toBe(1)
  })

  it("renders one static source-code wrapper and forwards root attributes", async () => {
    const slot = "code-wrapper-slot-token"
    const html = await container.renderToString(CodeCollapsibleWrapper, {
      props: { class: "code-wrapper-custom", id: "source-example" },
      slots: { default: slot }
    })

    expect(occurrences(html, "data-code-collapsible")).toBe(1)
    expect(html).toContain('data-variant="source"')
    expect(html).toContain('id="source-example"')
    expect(html).toContain("code-wrapper-custom")
    expect(occurrences(html, slot)).toBe(1)
  })

  it("does not emit hydration islands or widget-owned scripts", async () => {
    const outputs = await Promise.all([
      container.renderToString(LinkedCard, { slots: { default: "Card" } }),
      container.renderToString(Kbd, { slots: { default: "K" } }),
      container.renderToString(AspectRatio, { props: { ratio: 1 } }),
      container.renderToString(Alert, { slots: { default: "Alert" } }),
      container.renderToString(Button, { slots: { default: "Button" } }),
      container.renderToString(CodeCollapsibleWrapper, {
        slots: { default: "Code" }
      })
    ])

    for (const html of outputs) {
      expect(html).not.toContain("<astro-island")
      expect(html).not.toContain("<script")
    }
  })
})
