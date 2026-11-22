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
import { createToaster, Toaster } from "~/registry/ui/toast"
function Actions() {
  const state = useQuestionnaire()
  const last = () => state.step() === state.steps().length - 1
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <Show
        when={last()}
        fallback={<QuestionnaireNext>Next</QuestionnaireNext>}
      >
        <QuestionnaireSubmit>Execution plan</QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}

export default function QuestionnaireConditional() {
  const toast = createToaster()
  const [cloud, setCloud] = createSignal(false)
  const steps = () =>
    cloud() ? ["runtime", "environment", "approval"] : ["runtime", "approval"]

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"
        steps={steps()}
        required={steps()}
        defaultValue={{ runtime: "local" }}
        onValueChange={(answers) => setCloud(answers.runtime === "cloud")}
        onComplete={() => toast("Execution plan saved")}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem value="runtime">
          <QuestionnaireTitle>Where should the agent run?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Cloud runs add an environment question to this flow.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="local">
              Local workspace
            </QuestionnaireChoice>
            <QuestionnaireChoice value="cloud">
              Cloud workspace
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <Show when={cloud()}>
          <QuestionnaireItem value="environment">
            <QuestionnaireTitle>
              Which cloud environment should it use?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="preview">Preview</QuestionnaireChoice>
              <QuestionnaireChoice value="staging">Staging</QuestionnaireChoice>
              <QuestionnaireChoice value="isolated">
                Isolated sandbox
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
        </Show>
        <QuestionnaireItem value="approval">
          <QuestionnaireTitle>
            When should the agent request approval?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="writes">
              Before writing files
            </QuestionnaireChoice>
            <QuestionnaireChoice value="commands">
              Before running commands
            </QuestionnaireChoice>
            <QuestionnaireChoice value="sensitive">
              Only for sensitive actions
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <Actions />
      </Questionnaire>
    </div>
  )
}
