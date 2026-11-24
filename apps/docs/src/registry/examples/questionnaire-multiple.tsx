import {
  Questionnaire,
  type QuestionnaireAnswers,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"

export default function QuestionnaireMultiple() {
  const toast = createToaster()
  function handleSubmit(formData: QuestionnaireAnswers) {
    const context = Array.isArray(formData.context) ? formData.context : []

    toast("Context selected", {
      description: `Context: ${context.join(", ") || "None"}`
    })
  }

  return (
    <>
      <Toaster toaster={toast} />
      <Questionnaire
        shortcuts="letters"
        class="mx-auto max-w-md"
        steps={["context"]}
        required={["context"]}
        onComplete={handleSubmit}
      >
        <QuestionnaireItem value="context">
          <QuestionnaireTitle>
            What context should the agent inspect?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Select every source that may affect the implementation.
          </QuestionnaireDescription>
          <QuestionnaireChoices multiple>
            <QuestionnaireChoice value="source">
              Relevant source files
            </QuestionnaireChoice>
            <QuestionnaireChoice value="tests">
              Existing tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="docs">
              Architecture documentation
            </QuestionnaireChoice>
            <QuestionnaireChoice value="history">
              Recent commit history
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </>
  )
}
