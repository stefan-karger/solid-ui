import { Show } from "solid-js"

import {
  Questionnaire,
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
  QuestionnaireTitle,
  useQuestionnaire
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"

function Actions() {
  const state = useQuestionnaire()
  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <Show when={state.step() === 1}>
        <QuestionnaireSkip />
      </Show>
      <Show
        when={state.step() === 2}
        fallback={<QuestionnaireNext>Next</QuestionnaireNext>}
      >
        <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}

export default function QuestionnaireDemo() {
  const toast = createToaster()
  return (
    <>
      <Toaster toaster={toast} />
      <Questionnaire
        shortcuts="letters"
        class="mx-auto max-w-md"
        steps={["direction", "signals", "timing"]}
        required={["direction", "timing"]}
        onComplete={(answers) => {
          const signals = Array.isArray(answers.signals)
            ? answers.signals.join(", ")
            : ""
          toast("Agent plan saved", {
            description: `Direction: ${answers.direction ?? "None"} · Progress signals: ${signals || "None"} · Timing: ${answers.timing ?? "None"}`
          })
        }}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem value="direction">
          <QuestionnaireTitle>
            What should the agent build next?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose a direction or describe another task.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tool-calls">
              <span class="font-medium">Tool call timeline</span>
              <span class="text-muted-foreground">
                Show what the agent ran and what came back.
              </span>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="approvals">
              <span class="font-medium">Approval checkpoints</span>
              <span class="text-muted-foreground">
                Ask before sensitive or destructive actions.
              </span>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="handoffs">
              <span class="font-medium">Sub-agent handoffs</span>
              <span class="text-muted-foreground">
                Make delegated work and results easier to follow.
              </span>
            </QuestionnaireChoice>
            <QuestionnaireInput
              aria-label="Another agent feature"
              placeholder="Describe another feature…"
            />
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem value="signals">
          <QuestionnaireTitle>
            What should every progress update include?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Select all that apply, or skip this question.
          </QuestionnaireDescription>
          <QuestionnaireChoices multiple>
            <QuestionnaireChoice value="progress">Progress</QuestionnaireChoice>
            <QuestionnaireChoice value="decisions">
              Decisions
            </QuestionnaireChoice>
            <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
            <QuestionnaireChoice value="next-step">
              Next step
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem value="timing">
          <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose when the agent should begin the work.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
            <QuestionnaireChoice value="next-cycle">
              Next development cycle
            </QuestionnaireChoice>
            <QuestionnaireChoice value="backlog">
              Add it to the backlog
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <Actions />
      </Questionnaire>
    </>
  )
}
