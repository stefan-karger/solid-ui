import { render } from "@solidjs/web"
import { createAgent } from "@ui-sdk/solid/agent"
import { createSignal } from "solid-js"
import { expect, it, vi } from "vitest"

import { PresetPicker, PresetRadioSections } from "./preset-picker"

it("lets the UI SDK agent find and lock a preset field", async () => {
  const host = document.createElement("div")
  document.body.append(host)
  const agent = createAgent()
  const [locked, setLocked] = createSignal(false)
  const dispose = render(
    () => (
      <PresetPicker
        label="Theme"
        value="Cyan"
        sample={<span />}
        locked={locked()}
        mobile={false}
        onLock={() => setLocked((value) => !value)}
        onClose={vi.fn()}
      >
        <PresetRadioSections
          label="Theme"
          value="cyan"
          sections={[
            { key: "base", options: [{ value: "neutral", label: "Neutral" }] },
            { key: "colors", options: [{ value: "cyan", label: "Cyan" }] }
          ]}
          mobile={false}
          onSelect={vi.fn()}
          onPreview={vi.fn()}
        />
      </PresetPicker>
    ),
    host
  )
  try {
    expect(agent.snapshot().map((entry) => entry.label)).toContain("Lock Theme")
    const result = await agent.act({
      steps: [{ ref: "Lock Theme", action: "setPressed", args: [true] }]
    })
    expect(result).toMatchObject({ ok: true })
    const lock = host.querySelector('[aria-label="Lock Theme"]')
    expect(lock?.getAttribute("aria-pressed")).toBe("true")
    expect(lock?.getAttribute("title")).toBe("Unlock")
    expect(
      host.querySelector('[data-create-picker="Theme"] [data-create-value]')
        ?.textContent
    ).toBe("Cyan")
  } finally {
    dispose()
    host.remove()
  }
})
