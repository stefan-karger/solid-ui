import { createSignal } from "solid-js"

import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireError,
  QuestionnaireActions,
  QuestionnaireSubmit,
  QuestionnaireDescription
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/sonner"

export default function QuestionnaireShortcuts() {
  const toast = createToaster()
  const [mode, setMode] = createSignal("letters")

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <label class="mb-2 flex gap-2 text-sm">
        Shortcuts
        <select value={mode()} onChange={(event) => setMode(event.currentTarget.value)}>
          <option value="letters">Letters</option>
          <option value="numbers">Numbers</option>
          <option value="none">None</option>
        </select>
      </label>
      <Questionnaire
        class="mx-auto max-w-md"
        steps={["action"]}
        required={["action"]}
        onKeyDown={(event) => {
          if (
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            mode() === "none" ||
            event.target instanceof HTMLSelectElement
          )
            return
          const index = (mode() === "letters" ? "abc" : "123").indexOf(event.key.toLowerCase())
          const choice =
            index < 0
              ? undefined
              : event.currentTarget.querySelectorAll<HTMLInputElement>('input[type="radio"]')[index]
          if (choice) {
            event.preventDefault()
            choice.focus()
            choice.click()
          }
        }}
        onComplete={() => toast("Action confirmed")}
      >
        <QuestionnaireItem value="action">
          <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Use the displayed shortcut or navigate with the keyboard.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="inspect">Inspect the implementation</QuestionnaireChoice>
            <QuestionnaireChoice value="tests">Run the relevant tests</QuestionnaireChoice>
            <QuestionnaireChoice value="patch">Prepare the patch</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSubmit>Confirm action</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
