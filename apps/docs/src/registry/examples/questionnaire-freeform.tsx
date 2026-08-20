import { toast } from "solid-sonner"

import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { Toaster } from "~/registry/ui/toast"

const items = [
  {
    choices: [{ value: "incremental" }, { value: "module" }, { value: "rewrite" }],
    name: "approach",
    required: true
  }
] as const

export default function QuestionnaireFreeform() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const approach = new FormData(event.currentTarget).get("approach")

    toast("Approach selected", {
      description: `Approach: ${approach ?? "None"}`
    })
  }

  return (
    <>
      <Toaster />
      <QuestionnaireRoot
        class="mx-auto max-w-md"
        items={items}
        onSubmit={handleSubmit}
        shortcuts="letters"
      >
        <QuestionnaireItem name="approach" required>
          <QuestionnaireTitle>How should the agent approach this refactor?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose a strategy or write a more specific instruction.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="incremental">
              Make the smallest safe change
            </QuestionnaireChoice>
            <QuestionnaireChoice value="module">Refactor one module at a time</QuestionnaireChoice>
            <QuestionnaireChoice value="rewrite">
              Replace the implementation completely
            </QuestionnaireChoice>
            <QuestionnaireInput
              aria-label="Another refactoring approach"
              placeholder="Describe another approach…"
            />
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnaireSubmit>Use this approach</QuestionnaireSubmit>
        </QuestionnaireActions>
      </QuestionnaireRoot>
    </>
  )
}
