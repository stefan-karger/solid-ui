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
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"

export default function QuestionnaireSkipExample() {
  const toast = createToaster()

  function handleSubmit(formData: QuestionnaireAnswers) {
    const answers = {
      task: formData.task,
      constraints: formData.constraints,
      review: formData.review
    }

    toast("Agent brief submitted", {
      description: `Task: ${answers.task ?? "None"} · Constraints: ${
        !answers.constraints ? "Skipped" : answers.constraints
      } · Review: ${answers.review ?? "None"}`
    })
  }

  return (
    <>
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"

        steps={["task", "constraints", "review"]}
        required={["task", "review"]}
        onComplete={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem value="task">
          <QuestionnaireTitle>What kind of change is this?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose the category that best describes the work.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="feature">
              New feature
            </QuestionnaireChoice>
            <QuestionnaireChoice value="fix">Bug fix</QuestionnaireChoice>
            <QuestionnaireChoice value="refactor">Refactor</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem value="constraints">
          <QuestionnaireTitle>
            Are there any implementation constraints?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Answer if needed, or intentionally skip this question.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="no-dependencies">
              Do not add dependencies
            </QuestionnaireChoice>
            <QuestionnaireChoice value="no-migrations">
              Do not change the database
            </QuestionnaireChoice>
            <QuestionnaireChoice value="preserve-api">
              Preserve the public API
            </QuestionnaireChoice>
            <QuestionnaireInput
              aria-label="Another implementation constraint"
              placeholder="Describe another constraint…"
            />
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <QuestionnaireItem value="review">
          <QuestionnaireTitle>
            How should the work be reviewed?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose the checks the agent should complete before handoff.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tests">
              Run the test suite
            </QuestionnaireChoice>
            <QuestionnaireChoice value="diff">
              Review the final diff
            </QuestionnaireChoice>
            <QuestionnaireChoice value="both">
              Tests and diff review
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Submit brief</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </>
  )
}
