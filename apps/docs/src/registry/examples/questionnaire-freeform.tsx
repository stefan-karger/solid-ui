import {
  Questionnaire,
  type QuestionnaireAnswers,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/sonner"

export default function QuestionnaireFreeform() {
  const toast = createToaster()
  function handleSubmit(formData: QuestionnaireAnswers) {
    const approach = formData.approach

    toast("Approach selected", {
      description: `Approach: ${approach ?? "None"}`
    })
  }

  return (
    <>
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"
        steps={["approach"]}
        required={["approach"]}
        onComplete={handleSubmit}
      >
        <QuestionnaireItem value="approach">
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
      </Questionnaire>
    </>
  )
}
