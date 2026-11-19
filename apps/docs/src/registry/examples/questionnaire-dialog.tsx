import { createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
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
        <QuestionnaireSubmit>Agent reply</QuestionnaireSubmit>
      </Show>
    </QuestionnaireActions>
  )
}

export default function QuestionnaireDialog() {
  const toast = createToaster()
  const [open, setOpen] = createSignal(false)

  return (
    <div class="w-full max-w-md text-start">
      <Toaster toaster={toast} />
      <Dialog open={open()} onOpenChange={setOpen}>
        <DialogTrigger
          render={(partProps) => (
            <Button {...partProps} variant="outline">
              Configure agent
            </Button>
          )}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure agent</DialogTitle>
            <DialogDescription>Choose the scope and verification.</DialogDescription>
          </DialogHeader>
          <Questionnaire
            class="mx-auto max-w-md"
            steps={["scope", "tests"]}
            required={["scope", "tests"]}
            onComplete={() => {
              setOpen(false)
              toast("Answers sent")
            }}
          >
            <QuestionnaireProgress />
            <QuestionnaireItem value="scope">
              <QuestionnaireTitle>Which files are in scope?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Choose how broadly the agent can update the workspace.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="component">Component only</QuestionnaireChoice>
                <QuestionnaireChoice value="feature">
                  Complete feature directory
                </QuestionnaireChoice>
                <QuestionnaireChoice value="workspace">
                  Any related workspace file
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem value="tests">
              <QuestionnaireTitle>How much verification is needed?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Choose the checks the agent should run before handoff.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="targeted">Targeted tests</QuestionnaireChoice>
                <QuestionnaireChoice value="package">Package tests</QuestionnaireChoice>
                <QuestionnaireChoice value="full">Full workspace verification</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <Actions />
          </Questionnaire>
        </DialogContent>
      </Dialog>
    </div>
  )
}
