import { render } from "@solidjs/web"
import { createSignal } from "solid-js"
import { afterEach, expect, it, vi } from "vitest"

import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireInput,
  QuestionnaireNext,
  QuestionnaireSkip,
  QuestionnaireError
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
