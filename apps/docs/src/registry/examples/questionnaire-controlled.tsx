import { createSignal } from "solid-js"

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

const itemLabels: Record<string, string> = {
  scope: "Change scope",
  checks: "Verification",
  output: "Final output"
}

export default function QuestionnaireControlled() {
  const toast = createToaster()
  const [step, setStep] = createSignal(0)

  function handleSubmit(formData: QuestionnaireAnswers) {
    toast("Agent workflow configured", {
      description: `Scope: ${formData.scope ?? "None"} · Verification: ${formData.checks ?? "None"} · Output: ${formData.output ?? "None"}`
    })
  }

  return (
    <>
      <Toaster toaster={toast} />
      <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
        <p
          class="absolute end-0 top-0 text-sm text-muted-foreground"
          role="status"
        >
          Current checkpoint: {Object.values(itemLabels)[step()]}
        </p>

        <Questionnaire
          class="mt-auto"
          step={step()}
          steps={["scope", "checks", "output"]}
          required={["scope", "checks", "output"]}
          onStepChange={setStep}
          onComplete={handleSubmit}
        >
          <QuestionnaireProgress />

          <QuestionnaireItem value="scope">
            <QuestionnaireTitle>What may the agent change?</QuestionnaireTitle>
            <QuestionnaireDescription>
              The host stores the active checkpoint while Questionnaire
              navigates.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="component">
                Only the target component
              </QuestionnaireChoice>
              <QuestionnaireChoice value="tests">
                Component and related tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="feature">
                The complete feature area
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem value="checks">
            <QuestionnaireTitle>
              Which verification level should it use?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="targeted">
                Targeted tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="package">
                Package tests and typecheck
              </QuestionnaireChoice>
              <QuestionnaireChoice value="full">
                Full workspace verification
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem value="output">
            <QuestionnaireTitle>
              What should the agent return when finished?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="summary">
                Concise summary
              </QuestionnaireChoice>
              <QuestionnaireChoice value="diff">
                Summary with changed files
              </QuestionnaireChoice>
              <QuestionnaireChoice value="handoff">
                Detailed implementation handoff
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
      </div>
    </>
  )
}
