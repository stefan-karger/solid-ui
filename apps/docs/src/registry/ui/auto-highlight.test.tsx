import { render } from "@solidjs/web"
import { createMemo, createSignal, For } from "solid-js"
import { afterEach, describe, expect, it } from "vitest"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "./combobox"
import { Command, CommandInput, CommandItem, CommandList } from "./command"
type Option = { value: string; label: string }
const options: Option[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" }
]
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
function host() {
  const node = document.createElement("div")
  document.body.append(node)
  return node
}
async function inputText(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new InputEvent("input", { bubbles: true, data: value }))
  await flushUpdates()
}
function expectActiveOption(input: HTMLInputElement, label: string) {
  const option = [
    ...document.querySelectorAll<HTMLElement>("[role=option]")
  ].find((node) => node.textContent === label)!
  expect(option).toBeDefined()
  expect(option.hasAttribute("data-highlighted")).toBe(true)
  expect(
    input.getAttribute("aria-activedescendant") ??
      input.ariaActiveDescendantElement?.id
  ).toBe(option.id)
}
describe("native collection composition", () => {
  it("highlights and selects replacement Combobox objects", async () => {
    let selected: Option | null = null
    const Fixture = () => {
      const [query, setQuery] = createSignal("")
      const filtered = createMemo(() =>
        options.filter((option) =>
          option.label.toLowerCase().includes(query().toLowerCase())
        )
      )
      return (
        <Combobox<Option>
          defaultOpen
          autoHighlight="always"
          onQueryChange={setQuery}
          onValueChange={(value) => {
            selected = value
          }}
          itemToLabel={(item) => item.label}
        >
          <ComboboxInput aria-label="Framework" />
          <ComboboxContent>
            <ComboboxList>
              <For each={filtered()}>
                {(item) => (
                  <ComboboxItem value={item} label={item.label}>
                    {item.label}
                  </ComboboxItem>
                )}
              </For>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )
    }
    dispose = render(Fixture, host())
    await flushUpdates()
    const input = document.querySelector<HTMLInputElement>("[role=combobox]")!
    await inputText(input, "Alpha")
    expectActiveOption(input, "Alpha")
    await inputText(input, "Beta")
    expectActiveOption(input, "Beta")
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
    )
    await flushUpdates()
    expect(selected).toEqual(options[1])
  })
  it("highlights and invokes replacement commands", async () => {
    let selected = ""
    const Fixture = () => {
      const [query, setQuery] = createSignal("")
      const filtered = createMemo(() =>
        options.filter((item) =>
          item.label.toLowerCase().includes(query().toLowerCase())
        )
      )
      return (
        <Command
          onQueryChange={setQuery}
          onAction={(value) => {
            selected = value
          }}
        >
          <CommandInput />
          <CommandList>
            <For each={filtered()}>
              {(item) => (
                <CommandItem value={item.value} label={item.label}>
                  {item.label}
                </CommandItem>
              )}
            </For>
          </CommandList>
        </Command>
      )
    }
    dispose = render(Fixture, host())
    await flushUpdates()
    const input = document.querySelector<HTMLInputElement>("[role=combobox]")!
    await inputText(input, "Alpha")
    expectActiveOption(input, "Alpha")
    await inputText(input, "Beta")
    expectActiveOption(input, "Beta")
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
    )
    await flushUpdates()
    expect(selected).toBe("beta")
  })
})
