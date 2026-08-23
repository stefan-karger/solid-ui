import { toast } from "solid-sonner"

import { Button } from "~/registry/ui/button"
import {
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
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"

const items = [
  { name: "change", required: true },
  { name: "verification", required: true },
  { name: "notes" }
] as const

export default function QuestionnaireResume() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answers = {
      change: formData.get("change"),
      verification: formData.getAll("verification"),
      notes: formData.get("notes")
    }

    toast("Draft updated", {
      description: `Migration: ${answers.change ?? "None"} · Verification: ${answers.verification.join(", ") || "None"} · Notes: ${answers.notes || "None"}`
    })
  }

  return (
    <QuestionnaireRoot
      class="mx-auto max-w-md"
      defaultItem="verification"
      items={items}
      onReset={() => toast("Saved answers restored")}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="change" required>
        <QuestionnaireTitle>What kind of migration is this?</QuestionnaireTitle>
        <QuestionnaireDescription>
          This answer was saved during the previous session.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice defaultChecked value="incremental">
            Incremental migration
          </QuestionnaireChoice>
          <QuestionnaireChoice value="cutover">Single cutover</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem multiple name="verification" required>
        <QuestionnaireTitle>How should the migration be verified?</QuestionnaireTitle>
        <QuestionnaireDescription>
          These checks were selected during the previous session.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice defaultChecked value="tests">
            Run migration tests
          </QuestionnaireChoice>
          <QuestionnaireChoice defaultChecked value="typecheck">
            Run the typecheck
          </QuestionnaireChoice>
          <QuestionnaireChoice value="manual">Perform a manual smoke test</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="notes">
        <QuestionnaireTitle>Anything else the agent should remember?</QuestionnaireTitle>
        <QuestionnaireDescription>This note was saved with the draft.</QuestionnaireDescription>
        <QuestionnaireInput
          aria-label="Saved migration note"
          defaultValue="Keep the existing public API stable."
        />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <Button type="reset" variant="outline">
          Reset changes
        </Button>
        <QuestionnairePrevious />
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Update draft</QuestionnaireSubmit>
      </QuestionnaireActions>
    </QuestionnaireRoot>
  )
}
