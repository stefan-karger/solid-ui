import { toast } from "solid-sonner"

import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { Toaster } from "~/registry/ui/toast"

const items = [
  {
    choices: [{ value: "source" }, { value: "tests" }, { value: "docs" }, { value: "history" }],
    name: "context",
    required: true
  }
] as const

export default function QuestionnaireMultiple() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const context = new FormData(event.currentTarget).getAll("context")

    toast("Context selected", {
      description: `Context: ${context.join(", ") || "None"}`
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
        <QuestionnaireItem multiple name="context" required>
          <QuestionnaireTitle>What context should the agent inspect?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Select every source that may affect the implementation.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="source">Relevant source files</QuestionnaireChoice>
            <QuestionnaireChoice value="tests">Existing tests</QuestionnaireChoice>
            <QuestionnaireChoice value="docs">Architecture documentation</QuestionnaireChoice>
            <QuestionnaireChoice value="history">Recent commit history</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
        </QuestionnaireActions>
      </QuestionnaireRoot>
    </>
  )
}
