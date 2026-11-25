import {
  Questionnaire,
  type QuestionnaireAnswers,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none"

export default function QuestionnaireAnimated() {
  const toast = createToaster()
  function handleSubmit(formData: QuestionnaireAnswers) {
    toast("Agent workflow saved", {
      description: `Task: ${formData.task ?? "None"} · Review: ${formData.review ?? "None"} · Delivery: ${formData.delivery ?? "None"}`
    })
  }

  return (
    <>
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"

        steps={["task", "review", "delivery"]}
        required={["task", "review", "delivery"]}
        onComplete={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem class={itemClassName} value="task">
          <QuestionnaireTitle>What should the agent do?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose the task for this run.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="implement">
              Implement the requested change
            </QuestionnaireChoice>
            <QuestionnaireChoice value="debug">
              Debug the current behavior
            </QuestionnaireChoice>
            <QuestionnaireChoice value="review">
              Review the implementation
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem class={itemClassName} value="review">
          <QuestionnaireTitle>
            How should the work be reviewed?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Select the verification depth.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">
              Targeted checks
            </QuestionnaireChoice>
            <QuestionnaireChoice value="complete">
              Complete test suite
            </QuestionnaireChoice>
            <QuestionnaireChoice value="manual">
              Tests and manual QA
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem class={itemClassName} value="delivery">
          <QuestionnaireTitle>
            How should the result be delivered?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose the final handoff format.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="summary">
              Concise summary
            </QuestionnaireChoice>
            <QuestionnaireChoice value="diff">
              Summary and changed files
            </QuestionnaireChoice>
            <QuestionnaireChoice value="handoff">
              Detailed review handoff
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Save workflow</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </>
  )
}
