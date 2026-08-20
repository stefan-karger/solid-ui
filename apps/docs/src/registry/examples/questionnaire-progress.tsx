import { Index } from "solid-js"

import { toast } from "solid-sonner"

import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle
} from "~/registry/ui/questionnaire"
import { Toaster } from "~/registry/ui/toast"

const items = [
  { name: "scope", required: true },
  { name: "strategy", required: true },
  { name: "tests", required: true },
  { name: "delivery", required: true }
] as const

export default function QuestionnaireProgressDemo() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Pull request plan ready", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Commits: ${formData.get("strategy") ?? "None"} · Tests: ${formData.get("tests") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`
    })
  }

  return (
    <>
      <Toaster />
      <QuestionnaireRoot
        class="mx-auto max-w-md"
        defaultItem="scope"
        items={items}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress class="w-full">
          {(state) => (
            <>
              <div aria-hidden="true" class="mb-2 flex gap-1.5">
                <Index each={Array.from({ length: state.total })}>
                  {(_, index) => (
                    <span
                      class={
                        index < state.current
                          ? "h-1.5 flex-1 rounded-full bg-primary"
                          : "h-1.5 flex-1 rounded-full bg-muted"
                      }
                    />
                  )}
                </Index>
              </div>
              <span>
                Checkpoint {state.current} of {state.total}
              </span>
            </>
          )}
        </QuestionnaireProgress>

        <QuestionnaireItem name="scope" required>
          <QuestionnaireTitle>How large is the change?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="small">Small patch</QuestionnaireChoice>
            <QuestionnaireChoice value="medium">Feature-sized change</QuestionnaireChoice>
            <QuestionnaireChoice value="large">Cross-package change</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="strategy" required>
          <QuestionnaireTitle>How should commits be organized?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="single">Single commit</QuestionnaireChoice>
            <QuestionnaireChoice value="logical">Logical commits</QuestionnaireChoice>
            <QuestionnaireChoice value="squash">Squash before review</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="tests" required>
          <QuestionnaireTitle>Which tests should run?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">Targeted tests</QuestionnaireChoice>
            <QuestionnaireChoice value="package">Package suite</QuestionnaireChoice>
            <QuestionnaireChoice value="workspace">Full workspace</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="delivery" required>
          <QuestionnaireTitle>How should the work be delivered?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="patch">Patch only</QuestionnaireChoice>
            <QuestionnaireChoice value="commit">Committed locally</QuestionnaireChoice>
            <QuestionnaireChoice value="branch">Push a review branch</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Finish plan</QuestionnaireSubmit>
        </QuestionnaireActions>
      </QuestionnaireRoot>
    </>
  )
}
