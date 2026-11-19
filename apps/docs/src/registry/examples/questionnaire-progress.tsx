import { For, Show } from "solid-js"

import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireError,
  QuestionnaireActions,
  QuestionnaireSubmit,
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
        <QuestionnaireSubmit>Review plan</QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}
function Progress() {
  const state = useQuestionnaire()
  return (
    <QuestionnaireProgress class="w-full">
      <div class="mb-2 flex gap-1.5" aria-hidden="true">
        <For each={state.steps()}>
          {(_, index) => (
            <span
              class={[
                "h-1.5 flex-1 rounded-full",
                index() <= state.step() ? "bg-primary" : "bg-muted"
              ]}
            />
          )}
        </For>
      </div>
      Checkpoint {state.step() + 1} of {state.steps().length}
    </QuestionnaireProgress>
  )
}

export default function QuestionnaireProgressDemo() {
  const toast = createToaster()

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <Questionnaire
        class="mx-auto max-w-md"
        steps={["scope", "strategy", "tests", "delivery"]}
        required={["scope", "strategy", "tests", "delivery"]}
        onComplete={() => toast("Review plan saved")}
      >
        <Progress />
        <QuestionnaireItem value="scope">
          <QuestionnaireTitle>How large is the change?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="small">Small patch</QuestionnaireChoice>
            <QuestionnaireChoice value="medium">Feature-sized change</QuestionnaireChoice>
            <QuestionnaireChoice value="large">Cross-package change</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem value="strategy">
          <QuestionnaireTitle>How should commits be organized?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="single">Single commit</QuestionnaireChoice>
            <QuestionnaireChoice value="logical">Logical commits</QuestionnaireChoice>
            <QuestionnaireChoice value="squash">Squash before review</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem value="tests">
          <QuestionnaireTitle>Which tests should run?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">Targeted tests</QuestionnaireChoice>
            <QuestionnaireChoice value="package">Package suite</QuestionnaireChoice>
            <QuestionnaireChoice value="workspace">Full workspace</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem value="delivery">
          <QuestionnaireTitle>How should the work be delivered?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="patch">Patch only</QuestionnaireChoice>
            <QuestionnaireChoice value="commit">Committed locally</QuestionnaireChoice>
            <QuestionnaireChoice value="branch">Push a review branch</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <Actions />
      </Questionnaire>
    </div>
  )
}
