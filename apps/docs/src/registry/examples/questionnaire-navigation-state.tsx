import { toast } from "solid-sonner";
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
  QuestionnaireTitle,
} from "~/registry/ui/questionnaire";
import { Toaster } from "~/registry/ui/toast";
import { useQuestionnaire } from "~/registry/hooks/use-questionnaire";

const items = [
  { name: "permission", required: true },
  { name: "verification", required: true },
] as const;

function NavigationActions() {
  const state = useQuestionnaire();
  const unanswered = () => state.activeItemStatus === "unanswered";

  return (
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireNext
        class="data-[status=unanswered]:opacity-50"
        disabled={unanswered()}
        variant="secondary"
      >
        Next ({state.current} of {state.total})
      </QuestionnaireNext>
      <QuestionnaireSubmit disabled={unanswered()}>Save permissions</QuestionnaireSubmit>
    </QuestionnaireActions>
  );
}

export default function QuestionnaireNavigationState() {
  function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    toast("Permissions saved", {
      description: `Permission: ${formData.get("permission") ?? "None"} · Verification: ${formData.get("verification") ?? "None"}`,
    });
  }

  return (
    <>
      <Toaster />
      <QuestionnaireRoot
        class="mx-auto max-w-md"
        defaultItem="permission"
        items={items}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem name="permission" required>
          <QuestionnaireTitle>What may the agent modify?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Next is disabled until useQuestionnaire() reports the active item as answered.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="files">Project files</QuestionnaireChoice>
            <QuestionnaireChoice value="tests">Project files and tests</QuestionnaireChoice>
            <QuestionnaireChoice value="config">
              Files, tests, and configuration
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="verification" required>
          <QuestionnaireTitle>What must pass before completion?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tests">Tests</QuestionnaireChoice>
            <QuestionnaireChoice value="types">Tests and types</QuestionnaireChoice>
            <QuestionnaireChoice value="all">Tests, types, and visual QA</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <NavigationActions />
      </QuestionnaireRoot>
    </>
  );
}
