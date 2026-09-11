import * as ComboboxPrimitive from "@kobalte/core/combobox"
import { render } from "@solidjs/web"
import { createMemo, createSignal } from "solid-js"
import { afterEach, describe, expect, it } from "vitest"

import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from "./combobox"
import { Command, CommandInput, CommandItem, CommandList } from "./command"

type Option = {
  value: string
  label: string
}

const options: Option[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" }
]

let dispose: VoidFunction | undefined

async function flushUpdates() {
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 0))
}

function inputText(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new InputEvent("input", { bubbles: true, data: value }))
}

function expectActiveOption(input: HTMLInputElement, label: string) {
  const option = [...document.querySelectorAll<HTMLElement>("[role=option]")].find(
    (candidate) => candidate.textContent === label
  )

  expect(option).toBeDefined()
  expect(option!.hasAttribute("data-highlighted")).toBe(true)
  expect(input.getAttribute("aria-activedescendant")).toBe(option!.id)
  return option!
}

afterEach(() => {
  dispose?.()
  dispose = undefined
  document.body.innerHTML = ""
})

describe("filtered result auto-highlighting", () => {
  it("highlights and selects the replacement Combobox result", async () => {
    let selected: Option | null = null

    const Fixture = () => {
      const [query, setQuery] = createSignal("")
      const filteredOptions = createMemo(() => {
        const normalizedQuery = query().trim().toLowerCase()
        return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
      })

      return (
        <Combobox<Option>
          autoHighlight
          defaultOpen
          options={filteredOptions()}
          optionValue="value"
          optionLabel="label"
          optionTextValue="label"
          onInputChange={setQuery}
          onChange={(value) => {
            selected = value
          }}
          itemComponent={(props) => (
            <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
          )}
        >
          <ComboboxControl>
            <ComboboxInput />
            <ComboboxTrigger />
          </ComboboxControl>
          <ComboboxPrimitive.Content>
            <ComboboxList />
          </ComboboxPrimitive.Content>
        </Combobox>
      )
    }

    dispose = render(() => <Fixture />, document.body)
    const input = document.querySelector<HTMLInputElement>("input")!
    await flushUpdates()

    expectActiveOption(input, "Alpha")

    inputText(input, "Beta")
    await flushUpdates()

    expect(document.querySelectorAll("[role=option]")).toHaveLength(1)
    expectActiveOption(input, "Beta")

    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }))
    await flushUpdates()

    expect(selected).toEqual(options[1])
    expect(input.getAttribute("aria-expanded")).toBe("false")
  })

  it("highlights and invokes the replacement Command result", async () => {
    let selected: Option | null = null

    const Fixture = () => {
      const [query, setQuery] = createSignal("")
      const filteredOptions = createMemo(() => {
        const normalizedQuery = query().trim().toLowerCase()
        return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
      })

      return (
        <Command<Option>
          options={filteredOptions()}
          optionValue="value"
          optionLabel="label"
          optionTextValue="label"
          onInputChange={setQuery}
          onChange={(value) => {
            selected = value
          }}
          itemComponent={(props) => (
            <CommandItem item={props.item}>{props.item.rawValue.label}</CommandItem>
          )}
        >
          <CommandInput />
          <CommandList />
        </Command>
      )
    }

    dispose = render(() => <Fixture />, document.body)
    const input = document.querySelector<HTMLInputElement>("input")!
    await flushUpdates()

    expectActiveOption(input, "Alpha")

    inputText(input, "Beta")
    await flushUpdates()

    expect(document.querySelectorAll("[role=option]")).toHaveLength(1)
    expectActiveOption(input, "Beta")

    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }))
    await flushUpdates()

    expect(selected).toEqual(options[1])
    expect(document.querySelector("[role=listbox]")).not.toBeNull()
  })
})
