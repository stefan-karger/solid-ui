import { createSignal } from "solid-js"

import { toast } from "solid-sonner"

import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "~/registry/ui/dialog"
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
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
  { name: "tests", required: true }
] as const

export default function QuestionnaireDialog() {
  const [open, setOpen] = createSignal(false)

  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    setOpen(false)
    toast("Clarification sent", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("tests") ?? "None"}`
    })
  }

  return (
    <>
      <Toaster />
      <Dialog onOpenChange={setOpen} open={open()}>
        <DialogTrigger as={Button} variant="outline">
          Open clarification
        </DialogTrigger>
        <DialogContent>
          <QuestionnaireRoot defaultItem="scope" items={items} onSubmit={handleSubmit}>
            <QuestionnaireItem name="scope" required>
              <DialogHeader>
                <QuestionnaireProgress />
                <QuestionnaireTitle class="z-dialog-title z-font-heading">
                  Which files are in scope?
                </QuestionnaireTitle>
                <QuestionnaireDescription class="z-dialog-description">
                  Choose how broadly the agent can update the workspace.
                </QuestionnaireDescription>
              </DialogHeader>
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

            <QuestionnaireItem name="tests" required>
              <DialogHeader>
                <QuestionnaireProgress />
                <QuestionnaireTitle class="z-dialog-title z-font-heading">
                  How much verification is needed?
                </QuestionnaireTitle>
                <QuestionnaireDescription class="z-dialog-description">
                  Choose the checks the agent should run before handoff.
                </QuestionnaireDescription>
              </DialogHeader>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="targeted">Targeted tests</QuestionnaireChoice>
                <QuestionnaireChoice value="package">Package tests</QuestionnaireChoice>
                <QuestionnaireChoice value="full">Full workspace verification</QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            <DialogFooter>
              <DialogClose as={Button} type="button" variant="outline">
                Cancel
              </DialogClose>
              <QuestionnaireActions>
                <QuestionnairePrevious />
                <QuestionnaireNext>Next</QuestionnaireNext>
                <QuestionnaireSubmit>Send answer</QuestionnaireSubmit>
              </QuestionnaireActions>
            </DialogFooter>
          </QuestionnaireRoot>
        </DialogContent>
      </Dialog>
    </>
  )
}
