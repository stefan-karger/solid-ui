import { render, type JSX } from "@solidjs/web"
import { createSignal } from "solid-js"
import { afterEach, expect, it, vi } from "vitest"

import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireInput,
  QuestionnaireNext,
  QuestionnaireSkip,
  QuestionnaireError,
  QuestionnaireChoices,
  QuestionnaireChoice
} from "./questionnaire"

let dispose: VoidFunction | undefined
afterEach(() => {
  dispose?.()
  document.body.innerHTML = ""
})
it("keeps controlled answers until the parent accepts changes and blocks skipping required questions", async () => {
  const complete = vi.fn(),
    change = vi.fn()
  let accept!: () => void
  const host = document.createElement("div")
  document.body.append(host)
  function Fixture() {
    const [answers, setAnswers] = createSignal({ name: "" })
    accept = () => setAnswers({ name: "Accepted by parent" })
    return (
      <Questionnaire
        steps={["name"]}
        required={["name"]}
        value={answers()}
        onValueChange={change}
        onComplete={complete}
      >
        <QuestionnaireItem value="name">
          <QuestionnaireTitle>Name</QuestionnaireTitle>
          <QuestionnaireInput />
        </QuestionnaireItem>
        <QuestionnaireError />
        <QuestionnaireSkip />
        <QuestionnaireNext />
      </Questionnaire>
    )
  }
  dispose = render(Fixture, host)
  host.querySelectorAll<HTMLButtonElement>("button")[0]!.click()
  await vi.waitFor(() =>
    expect(host.querySelector('[role="alert"]')!.textContent).toContain(
      "Please answer"
    )
  )
  expect(complete).not.toHaveBeenCalled()
  const input = host.querySelector("input")!
  input.value = "Proposed answer"
  input.dispatchEvent(new InputEvent("input", { bubbles: true }))
  await vi.waitFor(() =>
    expect(change).toHaveBeenCalledWith({ name: "Proposed answer" })
  )
  host.querySelectorAll<HTMLButtonElement>("button")[1]!.click()
  expect(complete).not.toHaveBeenCalled()
  accept()
  await vi.waitFor(() => expect(input.value).toBe("Accepted by parent"))
  host.querySelectorAll<HTMLButtonElement>("button")[1]!.click()
  expect(complete).toHaveBeenCalledWith({ name: "Accepted by parent" })
})

function mount(element: () => JSX.Element) {
  const host = document.createElement("div")
  document.body.append(host)
  dispose = render(element, host)
  return host
}

function press(host: HTMLElement, key: string, init: KeyboardEventInit = {}) {
  const target =
    (document.activeElement as HTMLElement | null) ??
    host.querySelector("form")!
  ;(host.contains(target) ? target : host.querySelector("form")!).dispatchEvent(
    new KeyboardEvent("keydown", { key, bubbles: true, ...init })
  )
}

function Choices(props: {
  shortcuts?: "letters" | "numbers"
  multiple?: boolean
  count?: number
  withInput?: boolean
}) {
  return (
    <Questionnaire steps={["pick", "other"]} shortcuts={props.shortcuts}>
      <QuestionnaireItem value="pick">
        <QuestionnaireTitle>Pick</QuestionnaireTitle>
        <QuestionnaireChoices multiple={props.multiple ?? false}>
          {Array.from({ length: props.count ?? 3 }, (_, index) => (
            <QuestionnaireChoice value={`option-${index + 1}`}>
              Option {index + 1}
            </QuestionnaireChoice>
          ))}
          {props.withInput && <QuestionnaireInput aria-label="Other" />}
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem value="other">
        <QuestionnaireTitle>Other</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="hidden-a">Hidden A</QuestionnaireChoice>
          <QuestionnaireChoice value="hidden-b">Hidden B</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
    </Questionnaire>
  )
}

const choices = (host: HTMLElement) => [
  ...host.querySelectorAll<HTMLElement>(
    'fieldset:not([hidden]) [data-slot="questionnaire-choice"]'
  )
]

it("renders a dot for radio choices and a check for checkbox choices", () => {
  for (const multiple of [false, true]) {
    const host = mount(() => <Choices multiple={multiple} />)
    const choice = choices(host)[0]!
    expect(choice.dataset.type).toBe(multiple ? "checkbox" : "radio")
    const indicator = choice.querySelector(
      '[data-slot="questionnaire-choice-indicator"]'
    )!
    expect(
      indicator.querySelector(
        '[data-slot="questionnaire-choice-indicator-dot"]'
      )
    ).not.toBeNull()
    expect(
      indicator.querySelector(
        '[data-slot="questionnaire-choice-indicator-check"]'
      )
    ).not.toBeNull()
    dispose?.()
    document.body.innerHTML = ""
  }
})

it("selects choices with letter shortcuts in the active item only", async () => {
  const host = mount(() => <Choices shortcuts="letters" />)
  const items = choices(host)
  expect(
    items.map(
      (item) =>
        item.querySelector('[data-slot="questionnaire-choice-shortcut"]')
          ?.textContent
    )
  ).toEqual(["A", "B", "C"])
  expect(
    items[1]!.querySelector('[role="radio"]')!.getAttribute("aria-keyshortcuts")
  ).toBe("B")
  press(host, "b", { repeat: true })
  expect(items[1]!.dataset.checked).toBeUndefined()
  press(host, "b", { ctrlKey: true })
  expect(items[1]!.dataset.checked).toBeUndefined()
  press(host, "b")
  await vi.waitFor(() => expect(items[1]!.dataset.checked).toBe(""))
  expect(document.activeElement).toBe(items[1]!.querySelector('[role="radio"]'))
  press(host, "d")
  expect(
    host.querySelector(
      'fieldset[hidden] [data-slot="questionnaire-choice"][data-checked]'
    )
  ).toBeNull()
})

it("limits number shortcuts to nine choices and ignores text entry", async () => {
  const host = mount(() => <Choices shortcuts="numbers" count={10} withInput />)
  const items = choices(host)
  expect(
    items
      .map(
        (item) =>
          item.querySelector('[data-slot="questionnaire-choice-shortcut"]')
            ?.textContent ?? null
      )
      .slice(8)
  ).toEqual(["9", null])
  const input = host.querySelector<HTMLInputElement>(
    'input[aria-label="Other"]'
  )!
  input.focus()
  press(host, "2")
  expect(items[1]!.dataset.checked).toBeUndefined()
  input.blur()
  press(host, "2")
  await vi.waitFor(() => expect(items[1]!.dataset.checked).toBe(""))
})

it("renders no shortcuts without the prop", () => {
  const host = mount(() => <Choices />)
  expect(
    host.querySelector('[data-slot="questionnaire-choice-shortcut"]')
  ).toBeNull()
  press(host, "a")
  expect(choices(host)[0]!.dataset.checked).toBeUndefined()
})

it("wraps the freeform input like upstream and forwards its props", () => {
  const host = mount(() => <Choices withInput />)
  const input = host.querySelector<HTMLInputElement>(
    'input[aria-label="Other"]'
  )!
  expect(input.parentElement!.dataset.slot).toBe("questionnaire-input-wrapper")
  expect(input.dataset.slot).not.toBe("questionnaire-input-wrapper")
})
