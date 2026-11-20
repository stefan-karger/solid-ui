import { render } from "@solidjs/web"
import { createSignal } from "solid-js"
import { expect, it } from "vitest"

import { Slider } from "./slider"

it("preserves focused thumbs while controlled values and the thumb count change", async () => {
  const host = document.createElement("div")
  document.body.append(host)
  const [value, setValue] = createSignal([30, 70])
  const dispose = render(
    () => <Slider value={value()} onValueChange={setValue} />,
    host
  )
  try {
    await new Promise((resolve) => setTimeout(resolve, 0))
    const input = host.querySelector<HTMLInputElement>('input[type="range"]')!
    input.focus()
    setValue([35, 70])
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(host.querySelector('input[type="range"]')).toBe(input)
    expect(document.activeElement).toBe(input)
    expect(input.value).toBe("35")
    setValue([35, 70, 90])
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(host.querySelectorAll('input[type="range"]')).toHaveLength(3)
    expect(document.activeElement).toBe(input)
  } finally {
    dispose()
    host.remove()
  }
})
