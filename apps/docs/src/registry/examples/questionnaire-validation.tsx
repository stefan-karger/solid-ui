import { createSignal, Show } from "solid-js"

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
      <Show when={last()} fallback={<QuestionnaireNext>Next</QuestionnaireNext>}>
        <QuestionnaireSubmit>Agent response</QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}

export default function QuestionnaireValidation() {
  const toast = createToaster()
  const [step, setStep] = createSignal(0)
  const [error, setError] = createSignal("")

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"
        steps={["detail", "audience"]}
        required={["detail", "audience"]}
        step={step()}
        onStepChange={setStep}
        onValueChange={() => setError("")}
        onComplete={(answers) => {
          if (answers.audience === "public" && answers.detail === "summary") {
            setError("Public answers need enough context. Choose a complete answer.")
            setStep(0)
          } else toast("Agent response configured")
        }}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem value="detail">
          <QuestionnaireTitle>How much detail should the answer include?</QuestionnaireTitle>
          <QuestionnaireDescription>Choose the response depth.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="summary">Concise summary</QuestionnaireChoice>
            <QuestionnaireChoice value="complete">Complete answer</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
          <Show when={error()}>
            <p role="alert" class="text-sm text-destructive">
              {error()}
            </p>
          </Show>
        </QuestionnaireItem>
        <QuestionnaireItem value="audience">
          <QuestionnaireTitle>Who will read the answer?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Public answers require complete context.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="team">My team</QuestionnaireChoice>
            <QuestionnaireChoice value="public">Public audience</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <Actions />
      </Questionnaire>
    </div>
  )
}
