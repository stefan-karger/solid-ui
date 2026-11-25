import { createSignal } from "solid-js"

import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"
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
  type QuestionnaireShortcutMode
} from "~/registry/ui/questionnaire"
import { createToaster, Toaster } from "~/registry/ui/toast"

export default function QuestionnaireShortcuts() {
  const toast = createToaster()
  const [mode, setMode] = createSignal<QuestionnaireShortcutMode | "none">(
    "letters"
  )

  return (
    <div class="relative mx-auto flex w-full max-w-md flex-col text-start">
      <Toaster toaster={toast} />
      <NativeSelect
        aria-label="Shortcut style"
        class="absolute end-0 top-0"
        value={mode()}
        onChange={(event) =>
          setMode(
            event.currentTarget.value as QuestionnaireShortcutMode | "none"
          )
        }
      >
        <NativeSelectOption value="none">No shortcuts</NativeSelectOption>
        <NativeSelectOption value="letters">Letters</NativeSelectOption>
        <NativeSelectOption value="numbers">Numbers</NativeSelectOption>
      </NativeSelect>
      <Questionnaire
        class="mt-16"
        steps={["action"]}
        required={["action"]}
        shortcuts={
          mode() === "none" ? undefined : (mode() as QuestionnaireShortcutMode)
        }
        onComplete={() => toast("Action confirmed")}
      >
        <QuestionnaireItem value="action">
          <QuestionnaireTitle>
            What should the agent do next?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Use the displayed shortcut or navigate with the keyboard.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="inspect">
              Inspect the implementation
            </QuestionnaireChoice>
            <QuestionnaireChoice value="tests">
              Run the relevant tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="patch">
              Prepare the patch
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSubmit>Confirm action</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
