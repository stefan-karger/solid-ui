import { Show } from "solid-js"

import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireError,
  QuestionnaireActions,
  QuestionnaireSubmit,
  QuestionnaireDescription,
  QuestionnairePrevious,
  QuestionnaireNext,
  QuestionnaireProgress,
  useQuestionnaire
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/sonner"
function Actions() {
  const state = useQuestionnaire()
  const last = () => state.step() === state.steps().length - 1
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <Show
        when={last()}
        fallback={
          <QuestionnaireNext disabled={!state.answers()[state.steps()[state.step()] ?? ""]?.length}>
            Next
          </QuestionnaireNext>
        }
      >
        <QuestionnaireSubmit disabled={!state.answers()[state.steps()[state.step()] ?? ""]?.length}>
          Permissions
        </QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}

export default function QuestionnaireNavigationState() {
  const toast = createToaster()

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"
        steps={["permission", "verification"]}
        required={["permission", "verification"]}
        onComplete={() => toast("Permissions saved")}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem value="permission">
          <QuestionnaireTitle>What may the agent modify?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Next is intentionally disabled until an answer is selected.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="files">Project files</QuestionnaireChoice>
            <QuestionnaireChoice value="tests">Project files and tests</QuestionnaireChoice>
            <QuestionnaireChoice value="config">
              Files, tests, and configuration
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem value="verification">
          <QuestionnaireTitle>What must pass before completion?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tests">Tests</QuestionnaireChoice>
            <QuestionnaireChoice value="types">Tests and types</QuestionnaireChoice>
            <QuestionnaireChoice value="all">Tests, types, and visual QA</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <Actions />
      </Questionnaire>
    </div>
  )
}
