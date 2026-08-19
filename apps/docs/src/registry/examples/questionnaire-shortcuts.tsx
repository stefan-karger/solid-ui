import { createSignal } from "solid-js";
import { toast } from "solid-sonner";
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireRoot,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "~/registry/ui/questionnaire";
import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select";
import { Toaster } from "~/registry/ui/toast";
import type { QuestionnaireShortcutMode } from "~/registry/hooks/use-questionnaire";

const items = [
  {
    choices: [{ value: "inspect" }, { value: "tests" }, { value: "patch" }],
    name: "action",
    required: true,
  },
] as const;

export default function QuestionnaireShortcuts() {
  const [shortcuts, setShortcuts] = createSignal<QuestionnaireShortcutMode | undefined>("letters");

  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();

    const action = new FormData(event.currentTarget).get("action");

    toast("Next action selected", {
      description: `Action: ${action ?? "None"} · Shortcuts: ${shortcuts() ?? "none"}`,
    });
  }

  return (
    <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
      <Toaster />
      <NativeSelect
        aria-label="Shortcut style"
        class="absolute end-0 top-0"
        value={shortcuts() ?? "none"}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setShortcuts(value === "letters" || value === "numbers" ? value : undefined);
        }}
      >
        <NativeSelectOption value="none">No shortcuts</NativeSelectOption>
        <NativeSelectOption value="letters">Letters</NativeSelectOption>
        <NativeSelectOption value="numbers">Numbers</NativeSelectOption>
      </NativeSelect>

      <QuestionnaireRoot
        class="mt-auto"
        items={items}
        shortcuts={shortcuts()}
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem name="action" required>
          <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Use the displayed shortcut or navigate with the keyboard.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="inspect">Inspect the implementation</QuestionnaireChoice>
            <QuestionnaireChoice value="tests">Run the relevant tests</QuestionnaireChoice>
            <QuestionnaireChoice value="patch">Prepare the patch</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnaireSubmit>Confirm action</QuestionnaireSubmit>
        </QuestionnaireActions>
      </QuestionnaireRoot>
    </div>
  );
}
