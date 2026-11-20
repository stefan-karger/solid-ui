import { render } from "@solidjs/web"
import { createAgent } from "@ui-sdk/solid/agent"
import { expect, it } from "vitest"

import DocsAppearance from "./docs-appearance"
import DocsSearch from "./docs-search"

it("exposes the theme and documentation search controls to the UI SDK agent", async () => {
  const host = document.createElement("div")
  document.body.append(host)
  const agent = createAgent()
  const dispose = render(
    () => (
      <>
        <DocsAppearance />
        <DocsSearch
          navigation={[
            {
              title: "Components",
              links: [{ title: "Button", href: "/docs/components/button" }]
            }
          ]}
        />
      </>
    ),
    host
  )
  try {
    const entries = agent
      .snapshot()
      .filter((entry) => !entry.offPage && entry.component !== "more")
    for (const entry of entries) expect(entry.label).toBeTruthy()
    expect(entries.map((entry) => entry.label)).toEqual(
      expect.arrayContaining([
        "Toggle theme",
        "Preview style",
        "Search documentation"
      ])
    )
    const result = await agent.act({
      steps: [
        { ref: "Toggle theme", action: "setPressed", args: [true] },
        { ref: "Search documentation", action: "setOpen", args: [true] }
      ]
    })
    expect(result).toMatchObject({ ok: true })
    expect(document.documentElement).toHaveProperty("dataset.colorMode", "dark")
    expect(
      document
        .querySelector('[role="dialog"] input')
        ?.getAttribute("aria-label")
    ).toBe("Find a section or component")
  } finally {
    dispose()
    host.remove()
    localStorage.removeItem("solid-ui-appearance")
    document.documentElement.classList.remove("dark", "style-nova")
    delete document.documentElement.dataset.colorMode
    delete document.documentElement.dataset.docsStyle
    document.documentElement.style.removeProperty("color-scheme")
  }
})
