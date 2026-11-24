import { Button } from "~/registry/ui/button"
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
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"

export default function QuestionnaireResume() {
  const toast = createToaster()
  function handleSubmit(formData: QuestionnaireAnswers) {
    const answers = {
      change: formData.change,
      verification: Array.isArray(formData.verification)
        ? formData.verification
        : [],
      notes: formData.notes
    }

    toast("Draft updated", {
      description: `Migration: ${answers.change ?? "None"} · Verification: ${answers.verification.join(", ") || "None"} · Notes: ${answers.notes || "None"}`
    })
  }

  return (
    <>
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"
        defaultStep={1}
        defaultValue={{
          change: "incremental",
          verification: ["tests", "typecheck"],
          notes: "Keep the existing public API stable."
        }}
        steps={["change", "verification", "notes"]}
        required={["change", "verification"]}
        onReset={() => toast("Saved answers restored")}
        onComplete={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem value="change">
          <QuestionnaireTitle>
            What kind of migration is this?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            This answer was saved during the previous session.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="incremental">
              Incremental migration
            </QuestionnaireChoice>
            <QuestionnaireChoice value="cutover">
              Single cutover
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem value="verification">
          <QuestionnaireTitle>
            How should the migration be verified?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            These checks were selected during the previous session.
          </QuestionnaireDescription>
          <QuestionnaireChoices multiple>
            <QuestionnaireChoice value="tests">
              Run migration tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="typecheck">
              Run the typecheck
            </QuestionnaireChoice>
            <QuestionnaireChoice value="manual">
              Perform a manual smoke test
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem value="notes">
          <QuestionnaireTitle>
            Anything else the agent should remember?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            This note was saved with the draft.
          </QuestionnaireDescription>
          <QuestionnaireInput aria-label="Saved migration note" />
        </QuestionnaireItem>

        <QuestionnaireActions class="flex-wrap">
          <Button type="reset" variant="outline">
            Reset changes
          </Button>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Update draft</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </>
  )
}
